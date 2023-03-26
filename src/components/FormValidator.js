export default class FormValidator {
  constructor(formValidation, formElement) {
    this._formValidation = formValidation;
    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._formValidation.inputSelector)
    );
    this._buttonSubmit = this._formElement.querySelector(
      this._formValidation.submitButtonSelector);
  }

  // проверка валидности
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }
  // проверка невалидности
  _hasInvalidInput() {
    return this._inputList.some((evt) => {
      return !evt.validity.valid;
    });
  }

  // отображает ошибку
  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);

    input.classList.add(this._formValidation.inputErrorClass);
    errorElement.classList.add(this._formValidation.errorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);

    input.classList.remove(this._formValidation.inputErrorClass);
    errorElement.classList.remove(this._formValidation.errorClass);
    errorElement.textContent = "";
  }

  // переключение внешнего вида кнопки в зависимости от ошибки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(
        this._formValidation.inactiveButtonClass
      );
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(
        this._formValidation.inactiveButtonClass
      );
      this._buttonSubmit.disabled = false;
    }
  }

  // обработчик событий
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  
  resetValidation() {
    this._toggleButtonState(); 

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) 
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}