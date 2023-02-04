// карточки из коробки
const initialCards = [
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1536855077928-3ac6ca7741b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=948&q=80',
  },
  {
    name: 'Эстосадок',
    link: 'https://images.unsplash.com/photo-1595954011025-b4a68c838562?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80',
  },
  {
    name: 'Ольхон',
    link: 'https://images.unsplash.com/photo-1614357932292-a38393b966a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
  {
    name: 'Гижгит',
    link: 'https://images.unsplash.com/photo-1631181089058-3cb4bf9b237b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
  {
    name: 'Липецк',
    link: 'https://images.unsplash.com/photo-1592036496319-b3f8d048021e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80',
  },
  {
    name: 'Телецкое озеро',
    link: 'https://images.unsplash.com/photo-1596003903067-bf5762ad5c19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  },
]

// ПОПАПЫ
// попап профиль
const elementEditProfilePopup = document.querySelector('#popup_edit-profile');
// попап добавление карточки
const elementAddCardsPopup = document.querySelector('#popup_new-cards');
// попап большое изображние
const elementBigImagePopup = document.querySelector('#popup__image-big');

// КНОПКИ
// кнопка редактировать профиль
const elementOpenButtonProfile = document.querySelector('.profile__edit-button');
// кнопка закрытия
const elementsCloseButton = document.querySelectorAll('.popup__close-button');
// кнопка добавления карточки
const elementAddCardsButton = document.querySelector('.profile__add-button');
//секция с карточками
const photoSection = document.querySelector('.elements__list');
// увеличение изображения карточки
const bigImage = elementBigImagePopup.querySelector('.popup__image');
const bigImageCaption = elementBigImagePopup.querySelector('.popup__image-text');

// ФОРМЫ
// форма профиля
const elementPopupEditForm = elementEditProfilePopup.querySelector('.popup__edit-form');
// форма добавления карточки
const formAddCards = elementAddCardsPopup.querySelector('.popup__form-cards');
// заполнения формы профиля
const elementProfileName = document.querySelector('.profile__name');
const elementProfileWorking = document.querySelector('.profile__working');

// ИНПУТЫ
// инпуты попап профиля
const popupName = elementEditProfilePopup.querySelector('.popup__input_data_name');
const popupWorking = elementEditProfilePopup.querySelector('.popup__input_data_working');
// инпуты попапа добавления карточки
const popupDataPlace = elementAddCardsPopup.querySelector('.popup__input_data_place');
const popupDataLink = elementAddCardsPopup.querySelector('.popup__input_data_link');

// темплейт
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element');

// Открытие, закрытие, сохранение изменений
// Функция открытия попап
function openPopup(evt) {
  evt.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  
}
// функция закртия попап
function closePopup(evt) {
  evt.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  
}

// Функция закрытия попапа кликом на оверлей
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
});



// Функция закрытия попапа по кнопке Escape
function closePopupEscape(evt) {
  if (evt.key ==='Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}    

// сохранение изменений
elementPopupEditForm.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  elementProfileName.textContent = popupName.value;
  elementProfileWorking.textContent = popupWorking.value;
  closePopup(elementEditProfilePopup);
});

// Функция отображения заполненных данных пользователя в профиле
function saveProfileData() {
  popupName.value = elementProfileName.textContent;
  popupWorking.value = elementProfileWorking.textContent;
}

elementOpenButtonProfile.addEventListener('click', () => {
  openPopup(elementEditProfilePopup);
  saveProfileData();
  
});

// Функции карточек, удалениe карточек, функция с disabled фото
// Функция карточек
function sectionCards(cards) {
  const templateCardsElement = cardTemplate.cloneNode(true);
  const elementImage = templateCardsElement.querySelector('.element__image');
  const elementText = templateCardsElement.querySelector('.element__text');
  const elementDelete = templateCardsElement.querySelector('.element__delete');
  const elementLike = templateCardsElement.querySelector('.element__like');
 
  elementImage.src = cards.link;
  elementImage.alt = cards.name;
  elementText.textContent = cards.name;

  elementLike.addEventListener('click', likeCards);
  elementDelete.addEventListener('click', cardDelete);
  elementImage.addEventListener('click', function () {
    bigImage.src = cards.link;
    bigImage.alt = cards.name;
    bigImageCaption.textContent = cards.name;
    openPopup(elementBigImagePopup);
});
  return templateCardsElement;
}
// удаление карточки
const cardDelete = (evt) => {
  evt.target.closest('.element').remove();
}
// // ЛАЙК КАРТОЧКИ
const likeCards = (evt) => {
  evt.target.classList.toggle('element__like_active');
}
// рендер карточек
function renderCard() {
  initialCards.forEach((item) => {
    const cardCreation = sectionCards(item);
    photoSection.prepend(cardCreation);
  });
}

renderCard();

  // сохранение информации из инпутов для добавления карточки
  formAddCards.addEventListener('submit', (submitFormHandler) => {
  submitFormHandler.preventDefault();
  const cardValues = sectionCards({
    name: popupDataPlace.value,
    link: popupDataLink.value,
  });

  photoSection.prepend(cardValues);
  formAddCards.reset();
  closePopup(elementAddCardsPopup);
});

// функция открытия с disabled для фото
function openPopupAddCards() {
  openPopup(elementAddCardsPopup);
  formAddCards.reset();
  const buttonSubmit = formAddCards.elements.save;
  buttonSubmit.classList.add('popup__save-form_inactive');
  buttonSubmit.setAttribute('disabled', true);
}
// слушатель для функции открытия с disabled для фото
elementAddCardsButton.addEventListener('click', openPopupAddCards);

// слушатели закрытия попапов
elementsCloseButton.forEach((evt) => {
  const popupElement = evt.closest('.popup');
  evt.addEventListener('click', () => closePopup(popupElement))
});