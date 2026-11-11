function FlashcardsPrototypeEditor(runtime, element, data) {
  (async () => {
    const {renderEditor} = await import(data.url);
    renderEditor(runtime, element, data);
  })();
}
