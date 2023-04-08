import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(element) {
    super(element);
    this._popupImage = this._element.querySelector(".popup__image");

    this._popupCaption = this._element.querySelector(".popup__image-text");
  }

  open(link, name) {
    super.open();

    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
  }
}
