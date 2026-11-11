import {
  describe, expect, it, vi, beforeEach,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import StudioUi from './studio-ui';

const createJqueryPostMock = () => ({
  done: vi.fn((doneCallback) => {
    doneCallback();
    return { fail: vi.fn() };
  }),
});

const jqueryMock = {
  post: vi.fn(),
};
vi.stubGlobal('$', jqueryMock);
vi.mock('./TinyMceEditor', () => ({
  __esModule: true,
  default: () => 'TiNYmCE EDitOR',
}));

describe('StudioUi component test', () => {
  const mockNotify = vi.fn();
  const studioSaveUrl = '/save/url';
  const studioUiProps = {
    initialTitle: 'Test Deck',
    initialFlashcards: [],
    studioSaveUrl,
    runtime: { notify: mockNotify, handlerUrl: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('opens straight on the cards, with no styling options', () => {
    render(<StudioUi {...studioUiProps} />);
    expect(screen.getByLabelText('Flashcards Deck Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Introduction')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Continue/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/colou?r|font size/i)).not.toBeInTheDocument();
  });

  it('runs onSave when clicking Save', async () => {
    jqueryMock.post.mockReturnValue(createJqueryPostMock());

    render(<StudioUi {...studioUiProps} />);
    await userEvent.click(screen.getByRole('link', { name: /Save/i }));
    expect(mockNotify)
      .toHaveBeenCalledTimes(2);
    expect(mockNotify)
      .toHaveBeenCalledWith('save', { state: 'start' });
    expect(mockNotify)
      .toHaveBeenCalledWith('save', { state: 'end' });
    expect(jqueryMock.post).toHaveBeenCalledWith(studioSaveUrl, JSON.stringify({
      title: 'Test Deck',
      intro: '',
      flashcards: [],
    }));
  });

  it('reports an error to Studio when the save fails', async () => {
    jqueryMock.post.mockReturnValue({
      done: vi.fn(() => ({
        fail: vi.fn((failCallback) => failCallback({ responseJSON: { error: 'Flashcard 1 must have a text front and back.' } })),
      })),
    });

    render(<StudioUi {...studioUiProps} />);
    await userEvent.click(screen.getByRole('link', { name: /Save/i }));
    expect(mockNotify).toHaveBeenCalledWith('save', { state: 'start' });
    expect(mockNotify).not.toHaveBeenCalledWith('save', { state: 'end' });
    expect(mockNotify).toHaveBeenCalledWith('error', {
      title: 'Unable to save',
      message: 'Flashcard 1 must have a text front and back.',
    });
  });

  it('runs onCancel when clicking Cancel', async () => {
    render(<StudioUi {...studioUiProps} />);
    await userEvent.click(screen.getByRole('link', { name: /Cancel/i }));
    expect(mockNotify)
      .toHaveBeenCalledWith('cancel', {});
  });
});
