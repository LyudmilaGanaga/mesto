import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector,  handleFormSubmit) {
    super(selector);
    this._handleFormSubmit =  handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
      // this._formValues[input.working] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
