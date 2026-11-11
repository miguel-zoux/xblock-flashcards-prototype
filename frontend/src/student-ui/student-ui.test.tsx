import React from 'react';
import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import {
  fireEvent, render, screen, waitFor, within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { launchUrl, mountInShadow } from '@zoux/exemplar-design-system';
import StudentUi, { DEFAULT_INTRO } from './student-ui';
import { deckReducer, initialDeck } from './useDeck';

const cards = [
  { front: 'Term 1', back: 'Definition 1' },
  { front: 'Term 2', back: 'Definition 2' },
  { front: 'Term 3', back: 'Definition 3' },
];

const dialog = () => screen.getByRole('dialog', { hidden: true });

// jsdom runs no CSS animations, so finish the falling card by hand.
const finishFall = () => {
  const falling = dialog().querySelector('.fc-card.is-falling');
  expect(falling).not.toBeNull();
  fireEvent.animationEnd(falling as Element);
};

async function answer(user: ReturnType<typeof userEvent.setup>, choice: 'Missed it' | 'Got it') {
  await user.click(within(dialog()).getByRole('button', { name: /Select to reveal the answer/ }));
  await user.click(within(dialog()).getByRole('button', { name: choice }));
  finishFall();
}

describe('StudentUi', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('shows the launch card with the title and default intro', () => {
    render(<StudentUi title="Retrieval Practice" flashcards={cards} />);
    expect(screen.getByText('Retrieval Practice')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_INTRO)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Launch Interactive' })).toBeInTheDocument();
    expect(dialog()).not.toHaveClass('is-open');
  });

  it('cannot be launched without cards', () => {
    render(<StudentUi title="Empty" flashcards={[]} />);
    expect(screen.getByRole('button', { name: 'Launch Interactive' })).toBeDisabled();
    expect(screen.getByText('No cards yet. Add some in Studio.')).toBeInTheDocument();
  });

  it('opens the interactive on the first card, with the hints', async () => {
    render(<StudentUi title="Deck" intro="Custom intro" flashcards={cards} />);
    expect(screen.getByText('Custom intro')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));

    expect(dialog()).toHaveClass('is-open');
    // Outside the learning app it opens as an overlay over the window.
    expect(dialog()).toHaveClass('wgu-overlay');
    expect(within(dialog()).getByText('1/3')).toBeInTheDocument();
    expect(within(dialog()).getByText('Click to reveal')).toBeInTheDocument();
    expect(within(dialog()).queryByRole('button', { name: 'Start again' })).not.toBeInTheDocument();
    // A new deck is dealt in.
    expect(dialog().querySelector('.fc-stage')).toHaveClass('fc-stage--deal');
  });

  it('flips the card to show the definition and the answers', async () => {
    render(<StudentUi title="Deck" flashcards={cards} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await user.click(within(dialog()).getByRole('button', { name: /Card 1 of 3: Term 1/ }));

    expect(dialog().querySelector('.fc-card')).toHaveClass('is-flipped');
    expect(within(dialog()).getByText('Definition 1')).toBeInTheDocument();
    expect(within(dialog()).getByText('How did you do?')).toBeInTheDocument();
    expect(within(dialog()).getByRole('button', { name: 'Missed it' })).toBeInTheDocument();
    expect(within(dialog()).getByRole('button', { name: 'Got it' })).toBeInTheDocument();
  });

  it('drops the card to the matching side and moves to the next one', async () => {
    render(<StudentUi title="Deck" flashcards={cards} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await user.click(within(dialog()).getByRole('button', { name: /Card 1 of 3/ }));
    await user.click(within(dialog()).getByRole('button', { name: 'Missed it' }));

    expect(dialog().querySelector('.fc-card.is-falling')).toHaveClass('is-falling--missed');
    finishFall();

    expect(within(dialog()).getByText('2/3')).toBeInTheDocument();
    // Later cards aren't dealt in again.
    expect(dialog().querySelector('.fc-stage')).not.toHaveClass('fc-stage--deal');
    // The hints only show on the very first card.
    expect(within(dialog()).queryByText('Click to reveal')).not.toBeInTheDocument();
    expect(within(dialog()).getByRole('button', { name: 'Start again' })).toBeInTheDocument();
  });

  it('answers with the arrow keys once the card is flipped', async () => {
    render(<StudentUi title="Deck" flashcards={cards} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await user.keyboard('{ArrowRight}');
    expect(dialog().querySelector('.fc-card.is-falling')).toBeNull();

    await user.click(within(dialog()).getByRole('button', { name: /Card 1 of 3/ }));
    await user.keyboard('{ArrowRight}');
    expect(dialog().querySelector('.fc-card.is-falling')).toHaveClass('is-falling--got');
  });

  it('shows the outcome with the missed cards, then practises only those', async () => {
    render(<StudentUi title="Deck" flashcards={cards} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await answer(user, 'Got it');
    await answer(user, 'Missed it');
    await answer(user, 'Got it');

    expect(within(dialog()).getByText('2/3')).toBeInTheDocument();
    expect(within(dialog()).getByText('Well done! You recalled 2 out of 3 from memory')).toBeInTheDocument();
    expect(within(dialog()).getByText('Another quick pass in that one is all it takes')).toBeInTheDocument();
    expect(within(dialog()).getByText('Here are the ones you marked as missed:')).toBeInTheDocument();
    expect(within(dialog()).getByText('Term 2')).toBeInTheDocument();

    await user.click(within(dialog()).getByRole('button', { name: 'Practice what you missed' }));
    expect(within(dialog()).getByText('1/1')).toBeInTheDocument();
    expect(within(dialog()).getByRole('button', { name: /Card 1 of 1: Term 2/ })).toBeInTheDocument();
  });

  it('praises a perfect run and hides the practice button', async () => {
    render(<StudentUi title="Deck" flashcards={cards.slice(0, 2)} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await answer(user, 'Got it');
    await answer(user, 'Got it');

    expect(within(dialog()).getByText('Coming back to these in a few days will do more than running them again now'))
      .toBeInTheDocument();
    expect(within(dialog()).queryByRole('button', { name: 'Practice what you missed' })).not.toBeInTheDocument();
    expect(within(dialog()).queryByText('Here are the ones you marked as missed:')).not.toBeInTheDocument();
  });

  it('closes and starts over from the launch card, keeping nothing', async () => {
    render(<StudentUi title="Deck" flashcards={cards} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await answer(user, 'Missed it');
    await user.click(within(dialog()).getByRole('button', { name: 'Close' }));
    // The content fades out first, then the interactive closes.
    expect(dialog().querySelector('.wgu-shell')).toHaveClass('is-closing');
    await waitFor(() => expect(dialog()).not.toHaveClass('is-open'));

    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    expect(within(dialog()).getByText('1/3')).toBeInTheDocument();
    expect(within(dialog()).getByText('Click to reveal')).toBeInTheDocument();
  });

  it('exits from the outcome', async () => {
    render(<StudentUi title="Deck" flashcards={cards.slice(0, 1)} />);
    await user.click(screen.getByRole('button', { name: 'Launch Interactive' }));
    await answer(user, 'Missed it');
    await user.click(within(dialog()).getByRole('button', { name: 'Exit' }));
    await waitFor(() => expect(dialog()).not.toHaveClass('is-open'));
  });
});

describe('deckReducer', () => {
  it('ignores answers until the card is flipped, and while a card is falling', () => {
    let state = initialDeck(cards);
    expect(deckReducer(state, { type: 'answer', answer: 'got' })).toBe(state);
    state = deckReducer(state, { type: 'flip' });
    state = deckReducer(state, { type: 'answer', answer: 'got' });
    expect(deckReducer(state, { type: 'answer', answer: 'missed' })).toBe(state);
    expect(deckReducer(state, { type: 'flip' })).toBe(state);
    expect(state.got).toBe(1);
  });

  it('starts empty decks as done, and ignores practice with nothing missed', () => {
    const state = initialDeck([]);
    expect(state.done).toBe(true);
    expect(deckReducer(state, { type: 'practiceMissed' })).toBe(state);
    expect(deckReducer(state, { type: 'fallen' })).toBe(state);
  });
});

describe('mountInShadow', () => {
  it('renders into a shadow root that loads only our stylesheet', () => {
    const host = document.createElement('div');
    const container = mountInShadow(host, ['/xblock/resource/flashcards_prototype/public/student-ui.css']);
    expect(host.shadowRoot).not.toBeNull();
    expect(container.getRootNode()).toBe(host.shadowRoot);
    const link = host.shadowRoot?.querySelector('link');
    expect(link?.getAttribute('href')).toBe('/xblock/resource/flashcards_prototype/public/student-ui.css');
    expect(host.shadowRoot?.querySelector('style')?.textContent).toContain('all: initial');
  });

  it('renders in the page when there is no stylesheet URL (the dev preview)', () => {
    const host = document.createElement('div');
    expect(mountInShadow(host)).toBe(host);
    expect(host.shadowRoot).toBeNull();
  });
});

describe('opening in the learning app', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
    vi.restoreAllMocks();
  });

  it('builds the block\'s own URL, keeping the unit\'s query string', () => {
    window.history.replaceState(null, '', '/xblock/unit-key?preview=1&view=student_view');
    expect(launchUrl('block-key')).toBe(
      `${window.location.origin}/xblock/block-key?preview=1&view=student_view&wgu_launch=1`,
    );
  });

  it('starts launched inside the modal, without the launch card, and asks the learning app to close it', async () => {
    window.history.replaceState(null, '', '/xblock/block-key?wgu_launch=1');
    const post = vi.spyOn(window.parent, 'postMessage');
    const user = userEvent.setup();
    render(<StudentUi title="Deck" flashcards={cards} usageId="block-key" />);

    expect(screen.queryByRole('button', { name: 'Launch Interactive' })).not.toBeInTheDocument();
    expect(dialog()).toHaveClass('is-open');
    expect(within(dialog()).getByText('1/3')).toBeInTheDocument();

    await user.click(within(dialog()).getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(post).toHaveBeenCalledWith({ type: 'plugin.modal-close' }, '*'));
  });
});
