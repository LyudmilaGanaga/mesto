export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .cloneNode(true)
      .content.querySelector(".element");

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();

    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementLike = this._element.querySelector(".element__like");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementText = this._element.querySelector(".element__text");

    this._elementImage.src = this._cardData.link;;
    this._elementImage.alt = this._cardData.name;
    this._elementText.textContent = this._cardData.name;

    this._setEventListeners();

    return this._element;
  }
  _handleLikeClick() {
    this._elementLike.classList.toggle("element__like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._elementDelete.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._cardData);
    });
  }
}
