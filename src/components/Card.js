export default class Card {
  constructor({
    data,
    templateSelector,
    handleCardClick,
    userId,
    handleLikeClick,
    handleDeleteIconClick,
    handleRemoveLike,
  }) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._userId = userId;
    this._isOwnerCard = data.owner._id === userId;

    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;

    this._handleRemoveLike = handleRemoveLike;
  }
  // ------------------------------------------------------------------------------------------------
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .cloneNode(true)
      .content.querySelector(".element");

    return cardElement;
  }
  // ------------------------------------------------------------------------------------------------
  createCard() {
    this._element = this._getTemplate();

    this._elementDelete = this._element.querySelector(".element__delete");

    this._elementLike = this._element.querySelector(".element__like");
    this._elementImage = this._element.querySelector(".element__image");
    this._elementText = this._element.querySelector(".element__text");
    this._elementLikes = this._element.querySelector(".element__likes");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementText.textContent = this._name;

    this._setEventListeners();

    this._userDeleteElement();
    this._userLike();
    this._counterLikes();

    return this._element;
  }
  // ------------------------------------------------------------------------------------------------

  _userDeleteElement() {
    if (!this._isOwnerCard) {
      this._elementDelete.remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  // -------------------------------------------------------------------------

  _userLike() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._elementLike.classList.add("element__like_active");
    }
  }

  handleLikeCard(data) {
    this._elementLikes.textContent = data.likes.length;
    this._elementLike.classList.toggle("element__like_active");
  }

  // счетчик лайков
  _counterLikes() {
    this._elementLikes.textContent = this._likes.length;
  }
  // -------------------------------------------------------------------------
  _setEventListeners() {
    this._elementLike.addEventListener("click", () => {
      if (this._elementLike.classList.contains("element__like_active")) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleLikeClick(this._cardId);
      }
    });

    this._elementDelete.addEventListener("click", () => {
      this._handleDeleteIconClick(this._cardId);
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
