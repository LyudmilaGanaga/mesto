const elementPopup = document.querySelector(".popup");
const elementOpenButton = document.querySelector(".profile__edit-button");
const elementCloseButton = elementPopup.querySelector(".popup__close-button");
const elementPopupForm = elementPopup.querySelector(".popup__form");
const popupName = elementPopup.querySelector(".popup__input_data_name");
const popupWorking = elementPopup.querySelector(".popup__input_data_working");
const elementProfileName = document.querySelector(".profile__name");
const elementProfileWorking = document.querySelector(".profile__working");

// открыть popup
elementOpenButton.addEventListener("click", () => {
  elementPopup.classList.add("popup_opened");
  popupName.value = elementProfileName.textContent;
  popupWorking.value = elementProfileWorking.textContent;
});

// закрыть popup
elementCloseButton.addEventListener("click", () => {
  elementPopup.classList.remove("popup_opened");
});

// сохранить изменения
elementPopupForm.addEventListener("submit", (submitFormHandler) => {
  submitFormHandler.preventDefault();
  elementProfileName.textContent = popupName.value;
  elementProfileWorking.textContent = popupWorking.value;
  elementPopup.classList.remove("popup_opened");
});
