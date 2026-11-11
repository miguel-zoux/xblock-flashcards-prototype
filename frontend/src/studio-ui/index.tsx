import * as React from 'react';
import { createRoot } from 'react-dom/client';
import StudioUi from './studio-ui';
import './style.scss';

// eslint-disable-next-line import/prefer-default-export
export const renderEditor = (
  runtime: XBlockRuntime,
  element: XBlockElementLike | null,
  {
    title, intro, flashcards,
  }: XBlockData,
) => {
  const container = element && 'jquery' in element ? element[0] : element;

  if (!container || !(container instanceof Element)) {
    return;
  }

  const studioSaveUrl = runtime.handlerUrl(element, 'studio_submit');

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <StudioUi
        initialTitle={title}
        initialIntro={intro ?? ''}
        initialFlashcards={flashcards}
        studioSaveUrl={studioSaveUrl}
        runtime={runtime}
      />
    </React.StrictMode>,
  );
};
