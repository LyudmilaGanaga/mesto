import "../pages/index.css";

import { formValidation } from "../utils/constants.js";
import {
  elementProfileName,
  elementProfileWorking,
  elementProfileAvatar,
  elementEditProfilePopup,
  elementPopupEditForm,
  popupName,
  popupWorking,
  elementAddCardsPopup,
  formAddCards,
  elementBigImagePopup,
  popupAvatar,
  elementAvatarForm,
  popupConfirm,
  elementOpenButtonProfile,
  elementAddCardsButton,
  elementOpenButtonAvatar,
  sectionCards
} from "../utils/constants.js";

// Импорт классов
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

let userId;

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    "Content-Type": "application/json",
    authorization: "fff1efa7-9818-44da-ba96-913e90767349",
  },
});

Promise.all([api.getInitialCards(), api.getDataUser()])
  .then(([initialCards, user]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// ------------------------------------------------------------------------------------
// РАБОТА С КАРТОЧКАМИ. УДАДЕНИЕ И ЛАЙК

const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: ".card-template",
    handleCardClick: (link, name) => {
      popupImage.open(link, name);
    },
    userId: userId,

// удаление
    handleDeleteIconClick: (id) => {
      popupDeleteCard.open();
      popupDeleteCard.submitHandler(() => {
        popupDeleteCard.deleting(true);
        api
          .deleteCard(id)
          .then(() => {
            popupDeleteCard.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(
              `Ошибка: ${err}`
            );
          })
          .finally(() => {
            popupDeleteCard.deleting(false);
          });
      });
    },

// лайк
    handleLikeClick: (id) => {
      api
        .putLike(id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleRemoveLike: (id) => {
      api
        .dileteLike(id)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(
            `Ошибка: ${err}`
          );
        });
    },
  });
  const cardElement = card.createCard();
  return cardElement;
};
// ------------------------------------------------------------------------------------
const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  sectionCards
);
// ------------------------------------------------------------------------------------
const submitAddCardData = (data) => {
  popupWithFormAddCards.loading(true);
  api
    .addCard(data)
    .then((data) => {
      cardsList.addItemPrepend(createCard(data));
      popupWithFormAddCards.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormAddCards.loading(false);
    });
};

function openAddCard() {
  popupWithFormAddCards.open();
  formValidatorAddCards.resetValidation();
}
elementAddCardsButton.addEventListener("click", openAddCard);

// ------------------------------------------------------------------------------------
const userInfo = new UserInfo({
  name: elementProfileName,
  about: elementProfileWorking,
  avatar: elementProfileAvatar,
});

// ПРОФИЛЬ
const submitUserData = (data) => {
  popupEditProfile.loading(true);
  api
    .editInfoUser(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.loading(false);
    });
};

function openSaveProfileData() {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupWorking.value = data.about;
  formValidatorEditProfileForm.resetValidation();
}

elementOpenButtonProfile.addEventListener("click", openSaveProfileData);

// -------------------------------------------------------------------------------
// АВАТАР
const openAvatar = (data) => {
  popupWithFormAvatar.loading(true);
  api
    .editUserAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(
        `Ошибка: ${err}`
      );
    })
    .finally(() => {
      popupWithFormAvatar.loading(false);
    });
};

function elenentOpenAvatar() {
  popupWithFormAvatar.open();
  avatarFormValidator.resetValidation();
}
elementOpenButtonAvatar.addEventListener("click", elenentOpenAvatar);

// -------------------------------------------------------------------------------
// ЭКЗЕМПЛЯРЫ КЛАССОВ

const popupWithFormAddCards = new PopupWithForm(
  elementAddCardsPopup,
  submitAddCardData
);
popupWithFormAddCards.setEventListeners();

const popupEditProfile = new PopupWithForm(
  elementEditProfilePopup,
  submitUserData
);
popupEditProfile.setEventListeners();

const popupWithFormAvatar = new PopupWithForm(popupAvatar, openAvatar);
popupWithFormAvatar.setEventListeners();

const popupDeleteCard = new PopupWithSubmit(popupConfirm);
popupDeleteCard.setEventListeners();

const popupImage = new PopupWithImage(elementBigImagePopup);
popupImage.setEventListeners();

// -------------------------------------------------------------------------------
// ВАЛИДАЦИЯ
const formValidatorEditProfileForm = new FormValidator(
  formValidation,
  elementPopupEditForm
);
formValidatorEditProfileForm.enableValidation();

const formValidatorAddCards = new FormValidator(formValidation, formAddCards);
formValidatorAddCards.enableValidation();

const avatarFormValidator = new FormValidator(
  formValidation,
  elementAvatarForm
);
avatarFormValidator.enableValidation();
