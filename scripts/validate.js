// Функция ответсвенная за включение валидации всех форм
const formValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-form",
  inactiveButtonClass: "popup__save-form_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// Слушатели
function setEventListeners(formSelector, formValidation) {
  const inputList = Array.from(
    formSelector.querySelectorAll(formValidation.inputSelector)
  );
  const submitButton = formSelector.querySelector(
    formValidation.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, formValidation);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValidity(formSelector, inputSelector, formValidation);
      toggleButtonState(inputList, submitButton, formValidation);
    });
  });
}

// Функция переключения внешнего вида кнопки
function toggleButtonState(inputList, submitButtonSelector, formValidation) {
  if (hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(formValidation.inactiveButtonClass);
    submitButtonSelector.setAttribute("disabled", true);
  } else {
    submitButtonSelector.classList.remove(formValidation.inactiveButtonClass);
    submitButtonSelector.removeAttribute("disabled");
  }
}
// Функции ошибок
// Выдаёт ошибку
function showInputError(formSelector, inputSelector, formValidation, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.add(formValidation.inputErrorClass);
  errorElement.classList.add(formValidation.errorClass);
  errorElement.textContent = errorMessage;
}

// Удаление ошибки
function hideInputError(formSelector, inputSelector, formValidation) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.remove(formValidation.inputErrorClass);
  errorElement.classList.remove(formValidation.errorClass);
  errorElement.textContent = "";
}

// Функция проверяет есть валидность или нет и отображает ошибку
function checkInputValidity(formSelector, inputSelector, formValidation) {
  if (!inputSelector.checkValidity()) {
    showInputError(
      formSelector,
      inputSelector,
      formValidation,
      inputSelector.validationMessage
    );
  } else {
    hideInputError(formSelector, inputSelector, formValidation);
  }
}

// ПРОВЕРКИ
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.checkValidity();
  });
}

function enableValidation(formValidation) {
  const formList = Array.from(
    document.querySelectorAll(formValidation.formSelector)
  );

  formList.forEach((formSelector) => {
    setEventListeners(formSelector, formValidation);
  });
}

enableValidation(formValidation);