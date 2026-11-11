import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { mountInShadow } from '@zoux/exemplar-design-system';
import StudentUi from './student-ui';
import './style.scss';

// eslint-disable-next-line import/prefer-default-export
export const renderBlock = (
  element: Element | { 0?: Element } | null,
  {
    title, intro, flashcards, launchImageUrl, cssUrl, usageId,
  }: XBlockData,
) => {
  if (!element) {
    return;
  }

  // The XBlock element is wrapped in the first key of an Object after it's updated in Studio.
  const domElement = element[0] || element;

  // Render in a shadow root with our stylesheet, so LMS and theme styles can't
  // change the block. The dev preview has no cssUrl and renders in the page.
  const root = createRoot(mountInShadow(domElement, cssUrl ? [cssUrl] : []));
  root.render(
    <React.StrictMode>
      <StudentUi
        title={title}
        intro={intro}
        flashcards={flashcards}
        launchImageUrl={launchImageUrl}
        usageId={usageId}
      />
    </React.StrictMode>,
  );
};
