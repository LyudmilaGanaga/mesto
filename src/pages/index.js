import "../pages/index.css";
import { initialCards } from "../utils/constants.js";
import { formValidation } from "../utils/constants.js";
import {
  elementAddCardsPopup,
  elementOpenButtonProfile,
  elementAddCardsButton,
  elementPopupEditForm,
  popupName,
  popupWorking,
} from "../utils/constants.js";

// Импорт классов
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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

// -------------------------------------------------------------------------------
const cardsList = new Section(
  { items: initialCards, renderer },
  ".elements__list"
);
const userInfo = new UserInfo(".profile__name", ".profile__working");
const image = new PopupWithImage("#popup__image-big");
image.setEventListeners();

const popupWithFormAddCards = new PopupWithForm(
  "#popup_new-cards",
  submitAddCardData
);
popupWithFormAddCards.setEventListeners();

const form = new PopupWithForm("#popup_edit-profile", submitUserData);
form.setEventListeners();

elementAddCardsButton.addEventListener("click", openAddCard);
elementOpenButtonProfile.addEventListener("click", openSaveProfileData);

// -------------------------------------------------------------------------------

function renderer(item) {
  cardsList.addItem(createCard(item));
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleCardClick);
  const cardElement = card.createCard();

  return cardElement;
}

function handleCardClick(cardData) {
  image.open(cardData);
}

function openSaveProfileData() {
  formValidatorEditProfileForm.resetValidation();
  form.open();
  const userData = userInfo.getUserInfo();

  popupName.value = userData.name;
  popupWorking.value = userData.info;
}

function openAddCard() {
  formValidatorAddCards.resetValidation();
  popupWithFormAddCards.open();
}

function submitUserData(userData) {
  userInfo.setUserInfo(userData);
}

function submitAddCardData(cardData) {
  cardsList.addItem(
    createCard({
      name: cardData.name,
      link: cardData.link,
    })
  );
}

cardsList.renderItems();
