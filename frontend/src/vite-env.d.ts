/// <reference types="vite/client" />
/// <reference path="./react-inert.d.ts" />
declare let $: JQueryStatic;

type Flashcard = {
  front: string;
  back: string;
};

type XBlockElementLike = Element | { readonly 0: Element; readonly jquery: string };

interface XBlockRuntime {
  handlerUrl: (element: XBlockElementLike | null, action: string) => string
  notify: (action: string, data: object) => void
}

interface XBlockData {
  title: string,
  intro?: string,
  flashcards: Flashcard[],
  launchImageUrl?: string,
  cssUrl?: string,
  usageId?: string,
}
