export const initialCards = [
  {
    name: "Камчатка",
    link: "https://images.unsplash.com/photo-1536855077928-3ac6ca7741b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=948&q=80",
  },
  {
    name: "Эстосадок",
    link: "https://images.unsplash.com/photo-1595954011025-b4a68c838562?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80",
  },
  {
    name: "Ольхон",
    link: "https://images.unsplash.com/photo-1614357932292-a38393b966a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    name: "Гижгит",
    link: "https://images.unsplash.com/photo-1631181089058-3cb4bf9b237b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
  {
    name: "Липецк",
    link: "https://images.unsplash.com/photo-1592036496319-b3f8d048021e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  },
  {
    name: "Телецкое озеро",
    link: "https://images.unsplash.com/photo-1596003903067-bf5762ad5c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
  },
];

export const formValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-form",
  inactiveButtonClass: "popup__save-form_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// ПОПАПЫ
// попап профиль
export const elementEditProfilePopup = document.querySelector(
  "#popup_edit-profile"
);
// попап добавление карточки
export const elementAddCardsPopup = document.querySelector("#popup_new-cards");
// попап большое изображние
export const elementBigImagePopup = document.querySelector("#popup__image-big");

// КНОПКИ
// кнопка редактировать профиль
export const elementOpenButtonProfile = document.querySelector(
  ".profile__edit-button"
);
// кнопка закрытия
export const elementsCloseButton = document.querySelectorAll(
  ".popup__close-button"
);
// кнопка добавления карточки
export const elementAddCardsButton = document.querySelector(
  ".profile__add-button"
);

// КАРТОЧКИ
//секция с карточками
export const sectionCards = document.querySelector(".elements__list");
// увеличение изображения карточки
export const bigImage = elementBigImagePopup.querySelector(".popup__image");
export const bigImageCaption =
  elementBigImagePopup.querySelector(".popup__image-text");

// ФОРМЫ
// форма профиля
export const elementPopupEditForm =
  elementEditProfilePopup.querySelector(".popup__edit-form");
// форма добавления карточки
export const formAddCards =
  elementAddCardsPopup.querySelector(".popup__form-cards");
// заполнения формы профиля
export const elementProfileName = document.querySelector(".profile__name");
export const elementProfileWorking =
  document.querySelector(".profile__working");

// ИНПУТЫ
// инпуты попап профиля
export const popupName = elementEditProfilePopup.querySelector(
  ".popup__input_data_name"
);
export const popupWorking = elementEditProfilePopup.querySelector(
  ".popup__input_data_working"
);
// инпуты попапа добавления карточки
export const popupDataPlace = elementAddCardsPopup.querySelector(
  ".popup__input_data_place"
);
export const popupDataLink = elementAddCardsPopup.querySelector(
  ".popup__input_data_link"
);
  