// Функция ответсвенная за включение валидации всех форм
const formValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-form',
  inactiveButtonClass: 'popup__save-form_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

// Слушатели
function setEventListeners(formSelector) {
  const inputList = Array.from(formSelector.querySelectorAll(formValidation.inputSelector));
  const submitButton = formSelector.querySelector(formValidation.submitButtonSelector);

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, submitButton);
    });
  });
}
// Функция переключения внешнего вида кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formValidation.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(formValidation.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", false);
  }
}
// Функции ошибок

// Выдаёт ошибку
function showInputError(formSelector, inputSelector, errorMessage) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.add(formValidation.inputErrorClass);
  errorElement.classList.add(formValidation.errorClass);
  errorElement.textContent = errorMessage;
}

// Удаление ошибки
function hideInputError(formSelector, inputSelector) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);

  inputSelector.classList.remove(formValidation.inputErrorClass);
  errorElement.classList.remove(formValidation.errorClass);
  errorElement.textContent = "";
}

// Функция проверяет есть валидность или нет и отображает ошибку
function checkInputValidity(formSelector, inputSelector) {
  if (!inputSelector.checkValidity()) {
    showInputError(
      formSelector,
      inputSelector,
      inputSelector.validationMessage
    );
  } else {
    hideInputError(formSelector, inputSelector);
  }
}


// ПРОВЕРКИ
function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.checkValidity();
  });
}


function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formValidation.formSelector));

  formList.forEach((formSelector) => {
    setEventListeners(formSelector);
  });
}

enableValidation(formValidation);