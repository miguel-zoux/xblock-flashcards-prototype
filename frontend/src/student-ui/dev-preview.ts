import { renderBlock } from './index';

renderBlock(document.querySelector('#root'), {
  title: 'Retrieval Practice',
  flashcards: [
    { front: 'Self-esteem', back: 'Positive (high) or negative (low) feelings about oneself influenced by various factors.' },
    { front: 'Individualistic cultures', back: 'Societies that emphasize personal goals, individual achievements, and self-expression.' },
    { front: 'Implicit measures', back: 'Indirect methods, such as the implicit association test; used to study self-concept indirectly.' },
    { front: 'Self-concept', back: 'The overall set of beliefs a person has about who they are.' },
  ],
  launchImageUrl: '/launch-illustration.png',
});
