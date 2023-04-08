// класс отвечает за открытие и закрытие попапа.
export default class Popup {
  constructor(element) {
    this._element = element;
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  // отвечает открытие попапа
  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  // отвечает за закрытие попапа
  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // содержит логику закрытия попапа клавишей Esc.
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this._element.querySelector(".popup__close-button");
    closeBtn.addEventListener("click", () => this.close());

    this._element.addEventListener("mousedown", (evt) => {
      const classes = evt.target.classList;
      if (classes.contains("popup")) {
        this.close();
      }
    });
  }
}
