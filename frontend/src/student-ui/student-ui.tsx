import * as React from 'react';
import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ArrowBackIcon, ArrowForwardIcon, AutoGraphIcon, Button, CloseIcon, FlipIcon, IconButton,
  InteractiveShell, LaunchCard, MouseIcon, ReplayIcon, canCoverWindow, canUseLearningModal, closeLearningModal,
  isLaunchedInModal, launchUrl, onLearningModalClosed, openLearningModal, useOverlay,
} from '@zoux/exemplar-design-system';
import { Answer, DeckState, useDeck } from './useDeck';

const INTERACTIVE_NAME = 'Flashcards';

export const DEFAULT_INTRO = "Hi! 👋 Let's pause for a quick review. You'll see a term, try to remember what it means, "
  + 'before revealing the answer. Select whether you got it right or wrong, and practice the ones you missed';

interface StudentUiProps {
  title: string,
  intro?: string,
  flashcards: Flashcard[],
  launchImageUrl?: string,
  /** The block's usage id, to open it in the learning app's window-sized modal. */
  usageId?: string,
}

function htmlToText(html: string): string {
  if (!html) {
    return '';
  }
  if (typeof document === 'undefined') {
    return html;
  }
  const container = document.createElement('div');
  container.innerHTML = html;
  return (container.textContent || '').replace(/\s+/g, ' ').trim();
}

function Html({ html, className }: { html: string, className?: string }) {
  // Card text is HTML written by course authors in Studio's rich-text editor.
  // eslint-disable-next-line react/no-danger
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

type CardProps = {
  card: Flashcard,
  number: number,
  total: number,
  flipped: boolean,
  falling: Answer | null,
  showHints: boolean,
  onFlip?: () => void,
  onAnswer?: (answer: Answer) => void,
  onFallen?: () => void,
  frontRef?: React.Ref<HTMLButtonElement>,
  backRef?: React.Ref<HTMLDivElement>,
  inert?: boolean,
};

function FlashCard({
  card, number, total, flipped, falling, showHints, onFlip, onAnswer, onFallen, frontRef, backRef, inert,
}: CardProps) {
  const className = [
    'fc-card',
    flipped && 'is-flipped',
    falling && `is-falling is-falling--${falling}`,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={className}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && falling) {
          onFallen?.();
        }
      }}
      inert={inert ? '' : undefined}
      aria-hidden={inert || undefined}
    >
      <div className="fc-card__inner">
        <button
          type="button"
          ref={frontRef}
          className="fc-card__face fc-card__front"
          onClick={onFlip}
          aria-hidden={flipped}
          inert={flipped ? '' : undefined}
          aria-label={`Card ${number} of ${total}: ${htmlToText(card.front)}. Select to reveal the answer.`}
        >
          <FlipIcon className="fc-card__flip-icon" />
          <Html html={card.front} className="fc-card__term wgu-type-h2 wgu-clamp" />
          {showHints && (
            <span className="fc-card__hint wgu-type-body-18-regular">
              <MouseIcon />
              Click to reveal
            </span>
          )}
        </button>
        <div
          className="fc-card__face fc-card__back"
          aria-hidden={!flipped}
          inert={!flipped ? '' : undefined}
        >
          <FlipIcon className="fc-card__flip-icon" />
          <div className="fc-card__answer" ref={backRef} tabIndex={-1}>
            <Html html={card.front} className="fc-card__answer-term wgu-type-h4" />
            <Html html={card.back} className="fc-card__definition wgu-type-body-20-regular wgu-clamp" />
          </div>
          {showHints && <p className="fc-card__question wgu-type-body-18-regular">How did you do?</p>}
          <div className="fc-card__footer">
            <button
              type="button"
              className="fc-answer fc-answer--missed wgu-type-body-18-bold"
              onClick={() => onAnswer?.('missed')}
            >
              <span className="fc-answer__label">
                <ArrowBackIcon />
                Missed it
              </span>
            </button>
            <span className="fc-card__divider" />
            <button
              type="button"
              className="fc-answer fc-answer--got wgu-type-body-18-bold"
              onClick={() => onAnswer?.('got')}
            >
              <span className="fc-answer__label">
                Got it
                <ArrowForwardIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Outcome({
  deck, onPracticeMissed, onExit,
}: { deck: DeckState, onPracticeMissed: () => void, onExit: () => void }) {
  const total = deck.cards.length;
  const missed = deck.missed.length;
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  let advice = 'Coming back to these in a few days will do more than running them again now';
  if (missed === 1) {
    advice = 'Another quick pass in that one is all it takes';
  } else if (missed > 1) {
    advice = `Another quick pass in those ${missed} is all it takes`;
  }

  return (
    <div className={`fc-outcome${missed === 0 ? ' fc-outcome--all-correct' : ''}`}>
      <div className="fc-outcome__summary">
        <AutoGraphIcon className="fc-outcome__icon" />
        <div className="fc-outcome__text">
          <p className="fc-outcome__score wgu-type-d1">{`${deck.got}/${total}`}</p>
          <h3 className="fc-outcome__headline wgu-type-h3" ref={headingRef} tabIndex={-1}>
            {`Well done! You recalled ${deck.got} out of ${total} from memory`}
          </h3>
          <p className="fc-outcome__advice wgu-type-body-20-regular">{advice}</p>
        </div>
        {missed > 0 && (
          <Button variant="secondary" icon={<ReplayIcon className="fc-button-icon" />} onClick={onPracticeMissed}>
            Practice what you missed
          </Button>
        )}
      </div>
      {missed > 0 && (
        <div className="fc-outcome__missed">
          <p className="wgu-type-body-18-bold">Here are the ones you marked as missed:</p>
          <ul className="fc-outcome__list">
            {deck.missed.map((card, i) => (
              // Cards have no id, and the same text may appear twice.
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} className="fc-outcome__item">
                <Html html={card.front} className="fc-outcome__term wgu-type-body-16-bold" />
                <Html html={card.back} className="wgu-type-body-16-regular" />
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button className="fc-outcome__exit" icon={<CloseIcon className="fc-button-icon" />} onClick={onExit}>
        Exit
      </Button>
    </div>
  );
}

function StudentUi({
  title, intro = DEFAULT_INTRO, flashcards, launchImageUrl, usageId,
}: StudentUiProps) {
  const [deck, dispatch] = useDeck(flashcards);
  const [announcement, setAnnouncement] = useState('');
  const launchRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Where the interactive opens, decided once:
  // - in the learning app's unit iframe, the learning app opens a window-sized
  //   modal with this block's own page in it (launchedInModal there);
  // - inside that modal, the block starts launched and shows no launch card;
  // - on a top-level page (the dev preview), an overlay over the window;
  // - in any other iframe (Studio's unit page), a panel in place of the launch card.
  const [launchedInModal] = useState(isLaunchedInModal);
  const [useLearningModal] = useState(() => Boolean(usageId) && canUseLearningModal());
  const [coversWindow] = useState(canCoverWindow);
  const panelRef = useRef<HTMLDivElement>(null);

  // Closing throws the run away (nothing is saved) and returns to the launch card.
  const handleExit = useCallback(() => {
    if (launchedInModal) {
      closeLearningModal();
      return;
    }
    dispatch({ type: 'start', cards: flashcards });
    window.setTimeout(() => launchRef.current?.focus(), 0);
  }, [launchedInModal, dispatch, flashcards]);

  const {
    isOpen, isClosing, open, close,
  } = useOverlay(handleExit);

  const handleClose = () => close();

  const handleLaunch = () => {
    if (useLearningModal && usageId) {
      openLearningModal(launchUrl(usageId), `${INTERACTIVE_NAME}: ${title}`);
      return;
    }
    dispatch({ type: 'start', cards: flashcards });
    open();
  };

  useEffect(() => {
    if (launchedInModal) {
      open();
    }
  }, [launchedInModal, open]);

  // Back from the learning app's modal: return focus to the launch button.
  useEffect(() => {
    if (!useLearningModal) {
      return undefined;
    }
    return onLearningModalClosed(() => launchRef.current?.focus());
  }, [useLearningModal]);

  const current = deck.cards[deck.index];
  const next = deck.cards[deck.index + 1];
  const total = deck.cards.length;
  const answered = deck.got + deck.missed.length;
  const showHints = deck.pass === 1 && deck.index === 0;
  const remaining = total - deck.index;

  // Whether the learner last used the keyboard (rather than a mouse, pen or touch).
  const usingKeyboardRef = useRef(false);
  useEffect(() => {
    const onKey = () => { usingKeyboardRef.current = true; };
    const onPointer = () => { usingKeyboardRef.current = false; };
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('pointerdown', onPointer, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.removeEventListener('pointerdown', onPointer, true);
    };
  }, []);

  // Move focus with the cards, so keyboard and screen-reader users follow along.
  // Browsers guess whether to draw the focus ring for focus moved in code, and
  // often draw it after a click; show it only to keyboard users.
  useEffect(() => {
    if (!isOpen || deck.done || deck.falling) {
      return;
    }
    const options = { preventScroll: true, focusVisible: usingKeyboardRef.current } as FocusOptions;
    if (deck.flipped) {
      backRef.current?.focus(options);
    } else {
      frontRef.current?.focus(options);
    }
  }, [isOpen, deck.done, deck.falling, deck.flipped, deck.index, deck.pass]);

  const announcementText = useMemo(() => {
    if (!isOpen) {
      return '';
    }
    if (deck.done) {
      return `You recalled ${deck.got} out of ${total} from memory.`;
    }
    if (!current) {
      return '';
    }
    const side = deck.flipped ? `Answer. ${htmlToText(current.back)}` : `Term. ${htmlToText(current.front)}`;
    return `Card ${deck.index + 1} of ${total}. ${side}`;
  }, [isOpen, deck.done, deck.got, deck.flipped, deck.index, current, total]);

  // Clear, then set on the next tick, so screen readers announce every change.
  useEffect(() => {
    setAnnouncement('');
    const timeout = window.setTimeout(() => setAnnouncement(announcementText), 0);
    return () => window.clearTimeout(timeout);
  }, [announcementText]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!deck.flipped || deck.falling || deck.done) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      dispatch({ type: 'answer', answer: 'missed' });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      dispatch({ type: 'answer', answer: 'got' });
    }
  };

  const modalClass = [
    'wgu-ds', 'fc-modal',
    isOpen && 'is-open',
    isOpen && (coversWindow ? 'wgu-overlay' : 'wgu-panel'),
  ].filter(Boolean).join(' ');

  // The in-place panel replaces the launch card; bring it into view.
  useEffect(() => {
    if (isOpen && !coversWindow) {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isOpen, coversWindow]);

  return (
    <div className="wgu-ds fc-block">
      {!launchedInModal && !(isOpen && !coversWindow) && (
        <LaunchCard
          name={INTERACTIVE_NAME}
          title={title}
          body={intro}
          actionLabel="Launch Interactive"
          onLaunch={handleLaunch}
          disabledReason={flashcards.length === 0 ? 'No cards yet. Add some in Studio.' : undefined}
          imageUrl={launchImageUrl}
          actionRef={launchRef}
        />
      )}
      {/* The dialog listens for ← and → so learners can answer from anywhere in it. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={panelRef}
        className={modalClass}
        role="dialog"
        aria-modal="true"
        aria-label={`${INTERACTIVE_NAME}: ${title}`}
        onKeyDown={handleKeyDown}
      >
        <div className="wgu-visually-hidden" role="status" aria-atomic="true">{announcement}</div>
        {isOpen && (
          <InteractiveShell
            name={INTERACTIVE_NAME}
            closing={isClosing}
            actions={(
              <>
                {!deck.done && answered > 0 && (
                  <IconButton label="Start again" onClick={() => dispatch({ type: 'start', cards: flashcards })}>
                    <ReplayIcon />
                  </IconButton>
                )}
                <IconButton label="Close" onClick={handleClose}><CloseIcon /></IconButton>
              </>
            )}
          >
            {deck.done ? (
              <Outcome
                deck={deck}
                onPracticeMissed={() => dispatch({ type: 'practiceMissed' })}
                onExit={handleClose}
              />
            ) : (
              // A new deck (launch, replay, practice) deals its cards in; later cards don't.
              <div className={`fc-stage${deck.index === 0 && answered === 0 ? ' fc-stage--deal' : ''}`}>
                <div className="fc-stack">
                  {remaining > 2 && <div className="fc-stack__back fc-stack__back--far" />}
                  {remaining > 1 && <div className="fc-stack__back fc-stack__back--near" />}
                  {deck.falling && next && (
                    <FlashCard
                      key={`${deck.pass}-${deck.index + 1}`}
                      card={next}
                      number={deck.index + 2}
                      total={total}
                      flipped={false}
                      falling={null}
                      showHints={false}
                      inert
                    />
                  )}
                  {current && (
                    <FlashCard
                      key={`${deck.pass}-${deck.index}`}
                      card={current}
                      number={deck.index + 1}
                      total={total}
                      flipped={deck.flipped}
                      falling={deck.falling}
                      showHints={showHints}
                      onFlip={() => dispatch({ type: 'flip' })}
                      onAnswer={(answer) => dispatch({ type: 'answer', answer })}
                      onFallen={() => dispatch({ type: 'fallen' })}
                      frontRef={frontRef}
                      backRef={backRef}
                    />
                  )}
                </div>
                <p className="fc-counter wgu-type-h5">{`${deck.index + 1}/${total}`}</p>
              </div>
            )}
          </InteractiveShell>
        )}
      </div>
    </div>
  );
}

export default StudentUi;
