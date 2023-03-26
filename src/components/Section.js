export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._initialCards = items.reverse();
    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems() {
    this._initialCards.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
