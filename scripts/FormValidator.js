export default class FormValidator {
  constructor(formValidation, formElement) {
    this._formValidation = formValidation;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._formValidation.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._formValidation.submitButtonSelector
    );
  }

  // проверка валидности
  _checkInputValidity(evt) {
    if (!evt.validity.valid) {
      this._showInputError(evt);
    } else {
      this._hideInputError(evt);
    }
  }
  // проверка невалидности
  _hasInvalidInput() {
    return this._inputList.some((evt) => {
      return !evt.validity.valid;
    });
  }

  // отображает ошибку
  _showInputError(evt) {
    const errorElement = this._formElement.querySelector(`.${evt.id}-error`);

    evt.classList.add(this._formValidation.inputErrorClass);
    errorElement.classList.add(this._formValidation.errorClass);
    errorElement.textContent = evt.validationMessage;
  }

  _hideInputError(evt) {
    const errorElement = this._formElement.querySelector(`.${evt.id}-error`);

    evt.classList.remove(this._formValidation.inputErrorClass);
    errorElement.classList.remove(this._formValidation.errorClass);
    errorElement.textContent = "";
  }

  // переключение внешнего вида кнопки в зависимости от ошибки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(
        this._formValidation.inactiveButtonClass
      );
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(
        this._formValidation.inactiveButtonClass
      );
      this._submitButton.disabled = false;
    }
  }

  // обработчик событий
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((evt) => {
      evt.addEventListener("input", () => {
        this._checkInputValidity(evt);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}