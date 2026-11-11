import * as React from 'react';
import EditingPage from './editing-page';

interface StudioUiProps {
  initialTitle: string
  initialIntro?: string
  initialFlashcards: Flashcard[]
  studioSaveUrl: string
  runtime: XBlockRuntime
}

interface ActionButtonLinkProps {
  className: string
  onClick: ()=>void
  label:string
}
function ActionButtonLink({ className, onClick, label }:ActionButtonLinkProps) {
  return (
    <li className="action-item">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        href="#"
        className={`button action-primary ${className}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
      >
        {label}
      </a>
    </li>
  );
}

export default function StudioUi({
  initialTitle, initialIntro = '', initialFlashcards, studioSaveUrl, runtime,
}: StudioUiProps) {
  const [title, setTitle] = React.useState(initialTitle);
  const [intro, setIntro] = React.useState(initialIntro);
  const [flashcards, setFlashcards] = React.useState(initialFlashcards);

  const handleSave = () => {
    runtime.notify('save', { state: 'start' });

    const flashcardsArray = flashcards.filter(card => card.front && card.back);

    $.post(studioSaveUrl, JSON.stringify({
      title,
      intro,
      flashcards: flashcardsArray,
    })).done(() => {
      runtime.notify('save', { state: 'end' });
    }).fail((xhr: { responseJSON?: { error?: string } }) => {
      // The handler answers malformed saves with a 400 and {"error": "..."}.
      runtime.notify('error', {
        title: 'Unable to save',
        message: xhr?.responseJSON?.error || 'Something went wrong while saving. Please try again.',
      });
    });
  };

  return (
    <div className="xblock-flashcards xblock--flashcards--editor editor-with-buttons">
      <div className="d-flex flex-column editor-layout">
        <div className="d-flex flex-column overflow-auto m-2.5">
          <EditingPage
            title={title}
            setTitle={setTitle}
            intro={intro}
            setIntro={setIntro}
            flashcards={flashcards}
            setFlashcards={setFlashcards}
          />
        </div>

        <div className="xblock-actions">
          <ul className="action-buttons">
            <ActionButtonLink
              onClick={handleSave}
              className="save-button"
              label="Save"
            />

            <li className="action-item">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="#"
                className="button cancel-button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); runtime.notify('cancel', {}); }}
              >Cancel
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
