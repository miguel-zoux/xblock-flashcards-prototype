import { useReducer } from 'react';

export type Answer = 'missed' | 'got';

export type DeckState = {
  /** Cards in the current pass, in the order they're shown. */
  cards: Flashcard[],
  /** Index of the card on top of the stack. */
  index: number,
  flipped: boolean,
  /** Set while the answered card falls away; the next card is already underneath. */
  falling: Answer | null,
  /** 1 for the first run through the deck, 2 and up for "Practice what you missed". */
  pass: number,
  missed: Flashcard[],
  got: number,
  done: boolean,
};

export type DeckAction =
  | { type: 'start', cards: Flashcard[] }
  | { type: 'flip' }
  | { type: 'answer', answer: Answer }
  | { type: 'fallen' }
  | { type: 'practiceMissed' };

export const initialDeck = (cards: Flashcard[]): DeckState => ({
  cards,
  index: 0,
  flipped: false,
  falling: null,
  pass: 1,
  missed: [],
  got: 0,
  done: cards.length === 0,
});

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  switch (action.type) {
    case 'start':
      return initialDeck(action.cards);
    case 'flip':
      if (state.done || state.falling) {
        return state;
      }
      return { ...state, flipped: !state.flipped };
    case 'answer': {
      if (state.done || state.falling || !state.flipped) {
        return state;
      }
      const card = state.cards[state.index];
      return {
        ...state,
        falling: action.answer,
        missed: action.answer === 'missed' ? [...state.missed, card] : state.missed,
        got: action.answer === 'got' ? state.got + 1 : state.got,
      };
    }
    case 'fallen': {
      if (!state.falling) {
        return state;
      }
      const next = state.index + 1;
      return {
        ...state,
        falling: null,
        flipped: false,
        index: next,
        done: next >= state.cards.length,
      };
    }
    case 'practiceMissed':
      if (state.missed.length === 0) {
        return state;
      }
      return { ...initialDeck(state.missed), pass: state.pass + 1 };
    default:
      return state;
  }
}

export function useDeck(cards: Flashcard[]) {
  return useReducer(deckReducer, cards, initialDeck);
}
