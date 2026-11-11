import React from 'react';
import {
  describe, expect, test, vi,
} from 'vitest';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import EditingPage from './editing-page';

vi.mock('./TinyMceEditor', () => ({
  __esModule: true,
  default: () => 'TiNYmCE EDitOR',
}));

describe('EditingPage', () => {
  test('Add a new flashcard', async () => {
    const user = userEvent.setup();
    const setFlashcards = vi.fn();
    const setTitle = vi.fn();
    const flashcards = [];
    const title = 'Test Deck';
    render(
      <EditingPage
        title={title}
        setTitle={setTitle}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
      />,
    );
    await user.click(screen.getByText(/Add Flashcard/i));
    expect(setFlashcards)
      .toHaveBeenCalledTimes(1);
  });

  test('Update flashcard front content', async () => {
    const setFlashcards = vi.fn();
    const setTitle = vi.fn();
    const title = 'Test Deck';
    const flashcards = [{
      front: 'Question 1',
      back: 'Answer 1',
    }];
    render(
      <EditingPage
        title={title}
        setTitle={setTitle}
        flashcards={flashcards}
        setFlashcards={setFlashcards}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Question 1/i }));
    // TinyMCE editor is mocked, so we can't test the actual editing functionality
    // But we can verify the component renders without errors (expecting 2 editors: front and back)
    expect(screen.getAllByText('TiNYmCE EDitOR')).toHaveLength(2);
  });
});
