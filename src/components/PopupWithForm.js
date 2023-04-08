import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(element, handleFormSubmit) {
    super(element);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._element.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");

    this._buttonSubmit = this._form.querySelector(".popup__save-form");
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  loading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
}
