import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._selector.querySelector(".popup__image");
    
    this._popupCaption = this._selector.querySelector(".popup__image-text");
  }

  open (link, name) {
    super.open();

    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
  }
}
