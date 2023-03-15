import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
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

const formValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-form",
  inactiveButtonClass: "popup__save-form_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// ПОПАПЫ
// попап профиль
const elementEditProfilePopup = document.querySelector("#popup_edit-profile");
// попап добавление карточки
const elementAddCardsPopup = document.querySelector("#popup_new-cards");
// попап большое изображние
const elementBigImagePopup = document.querySelector("#popup__image-big");

// КНОПКИ
// кнопка редактировать профиль
const elementOpenButtonProfile = document.querySelector(
  ".profile__edit-button"
);
// кнопка закрытия
const elementsCloseButton = document.querySelectorAll(".popup__close-button");
// кнопка добавления карточки
const elementAddCardsButton = document.querySelector(".profile__add-button");

// КАРТОЧКИ
//секция с карточками
const sectionCards = document.querySelector(".elements__list");
// увеличение изображения карточки
const bigImage = elementBigImagePopup.querySelector(".popup__image");
const bigImageCaption =
  elementBigImagePopup.querySelector(".popup__image-text");

// ФОРМЫ
// форма профиля
const elementPopupEditForm =
  elementEditProfilePopup.querySelector(".popup__edit-form");
// форма добавления карточки
const formAddCards = elementAddCardsPopup.querySelector(".popup__form-cards");
// заполнения формы профиля
const elementProfileName = document.querySelector(".profile__name");
const elementProfileWorking = document.querySelector(".profile__working");

// ИНПУТЫ
// инпуты попап профиля
const popupName = elementEditProfilePopup.querySelector(
  ".popup__input_data_name"
);
const popupWorking = elementEditProfilePopup.querySelector(
  ".popup__input_data_working"
);
// инпуты попапа добавления карточки
const popupDataPlace = elementAddCardsPopup.querySelector(
  ".popup__input_data_place"
);
const popupDataLink = elementAddCardsPopup.querySelector(
  ".popup__input_data_link"
);

// ВАЛИДАЦИЯ
const formValidatorEditProfileForm = new FormValidator(
  formValidation,
  elementPopupEditForm
);
formValidatorEditProfileForm.enableValidation();

const formValidatorAddCards = new FormValidator(
  formValidation,
  elementAddCardsPopup
);
formValidatorAddCards.enableValidation();

// ОТКРЫТИЕ, ЗАКРЫТИЕ ПОПАП
function openPopup(evt) {
  evt.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEscape);
  popup.addEventListener("mousedown", closePopupOverlay);
  popup.addEventListener('click', elementsCloseButton);
}

function openBigImagePopup(link, name) {
  bigImage.src = link;
  bigImage.alt = name;
  bigImageCaption.textContent = name;

  openPopup(elementBigImagePopup);
}

function closePopup(evt) {
  evt.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEscape);
  popup.removeEventListener("mousedown", closePopupOverlay);
  popup.removeEventListener('click', elementsCloseButton);
}

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

// КНОПКИ
elementOpenButtonProfile.addEventListener("click", () => {
  openPopup(elementEditProfilePopup);
  saveProfileData();
});

elementPopupEditForm.addEventListener("submit", submissionProfileForm);
formAddCards.addEventListener("submit", submissionFormAddCard);

elementsCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup)); 

  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup')) { 
      closePopup(popup); 
    }; 
  });
}) 



// РАБОТА С ФОРМАМИ
// Функция отображения заполненных данных пользователя в профиле и сохраняет их
function saveProfileData() {
  popupName.value = elementProfileName.textContent;
  popupWorking.value = elementProfileWorking.textContent;
}
// Функция отправки формы профиля
function submissionProfileForm(event) {
  event.preventDefault();

  elementProfileName.textContent = popupName.value;
  elementProfileWorking.textContent = popupWorking.value;

  closePopup(elementEditProfilePopup);
}

// Функция отправки формы добавления карточки
function submissionFormAddCard(event) {
  event.preventDefault();

  const newCard = createCard({
    name: popupDataPlace.value,
    link: popupDataLink.value,
  });

  sectionCards.prepend(newCard);
  formAddCards.reset();
  closePopup(elementAddCardsPopup);
}


// КАРТОЧКИ
function createCard(evt) {
  const card = new Card(evt, "#card-template", openBigImagePopup);
  return card.generateCard();
}

function renderElements() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    sectionCards.prepend(cardElement);
  });
}

elementAddCardsButton.addEventListener("click", () => {
  openPopup(elementAddCardsPopup);
  formAddCards.reset();
  formValidatorAddCards.resetValidation();
});

renderElements();
