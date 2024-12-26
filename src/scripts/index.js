import '../pages/index.css';
import { createCard, deleteCard, likeClick } from '../components/card.js';
import { openPopup, closeModal } from '../components/modal.js';
import { validationConfig } from '../components/config.js';
import { enableValidation, clearValidation, prepareFormForEditing } from '../components/validation.js';
import { getUserData, getCards, updateUserProfile, addNewCards, deleteCards, likeCard, unlikeCard, updateAvatar } from '../components/api.js';

// объявление глобальных переменных
const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCord = document.querySelector('.popup_type_new-card');
const popupUpdateAvatar = document.querySelector('.popup_type_avatar');
const formElementAvatar = popupUpdateAvatar.querySelector('.popup__form');
const avatarInput = formElementAvatar.querySelector('.popup__input_type_avatar');
const profileImage = document.querySelector('.profile__image');
const formElementProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_description');
const fieledTitle = document.querySelector('.profile__title');
const fieledDescription = document.querySelector('.profile__description');
const newCardName = popupAddCord.querySelector('.popup__input_type_card-name');
const newCardUrl = popupAddCord.querySelector('.popup__input_type_url');
const formElementAddCard = popupAddCord.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElementInPopup = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');

let userData = {};
let userId = '';

// Функция для обновления текста кнопки на "Сохранение..."
function setButtonTextToSaving(button) {
  button.textContent = 'Сохранение...';
};

// Функция для восстановления текста кнопки
function restoreButtonText(button, text) {
  button.textContent = text;
};

// Загрузка карточек с сервера
Promise.all([getUserData(), getCards()])
    .then(([user, cards]) => {

        userData = user; 
        userId = user._id;

        // Обновляем данные профиля
        document.querySelector('.profile__title').textContent = userData.name;
        document.querySelector('.profile__description').textContent = userData.about;
        document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

        // Создаём карточки
        cards.forEach((card) => {
          const cardData = {
              ...card, 
              currentUserId: userId
          };
      
          const cardElement = createCard(
              cardData,
              deleteCard,
              likeClick,
              openImageInPopup
          );
      
          cardList.append(cardElement);
      });
      
    })
    .catch((err) => {
        console.error('Ошибка:', err);
    });

// открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
    nameInput.value = fieledTitle.textContent;
    jobInput.value = fieledDescription.textContent;
    prepareFormForEditing(formElementProfile, validationConfig);
    openPopup(popupEditProfile);
});


// открытие попапа для добавления новой карточки
addCardButton.addEventListener('click', () => {
    newCardName.value = '';
    newCardUrl.value = '';
    openPopup(popupAddCord);
});

//открытие формы редактирования аватара
profileImage.addEventListener('click', () => {
    clearValidation(formElementAvatar, validationConfig);
    openPopup(popupUpdateAvatar);
  }); 

// Обработчик формы обновления аватара
formElementAvatar.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const button = formElementAvatar.querySelector('.popup__button');
    setButtonTextToSaving(button);
    const avatarUrl = avatarInput.value;
  
    updateAvatar(avatarUrl)
      .then((updatedUser) => {
        profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
        closeModal(popupUpdateAvatar);
        restoreButtonText(button, 'Сохранить');
      })
      .catch((err) => {
        console.error('Ошибка при обновлении аватара:', err);
        restoreButtonText(button, 'Сохранить');
      });
  });  
  
// обработчик отправки формы профиля
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    const button = formElementProfile.querySelector('.popup__button');
    setButtonTextToSaving(button);

    updateUserProfile(nameInput.value, jobInput.value)
      .then((updatedUser) => {
        fieledTitle.textContent = updatedUser.name;
        fieledDescription.textContent = updatedUser.about;
        closeModal(popupEditProfile);
        restoreButtonText(button, 'Сохранить');
      })
      .catch((err) => {
        console.error('Ошибка при обновлении профиля:', err);
        restoreButtonText(button, 'Сохранить');
      });
  }
  
formElementProfile.addEventListener('submit', handleFormSubmitProfile);  

// обработчик отправки формы добавления новой карточки
formElementAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const button = formElementAddCard.querySelector('.popup__button');
    setButtonTextToSaving(button);
  
    const newCardValue = {
      name: newCardName.value,
      link: newCardUrl.value
    };
  
    addNewCards(newCardValue.name, newCardValue.link)
      .then((card) => {
        const newCardElement = createCard({
          name: card.name,
          link: card.link,
          likes: card.likes,
          ownerId: card.owner._id,
          cardId: card._id,
          currentUserId: userData._id
        }, deleteCard, likeClick, openImageInPopup);
        cardList.prepend(newCardElement);
  
        formElementAddCard.reset();
        closeModal(popupAddCord);
        restoreButtonText(button, 'Создать');
      })
      .catch((err) => {
        console.error('Ошибка при добавлении карточки:', err);
        restoreButtonText(button, 'Создать');
      });
  });  

// открытие изображения в попапе
function openImageInPopup(imageSrc, imageAlt, imageCaption) {
    popupImageElementInPopup.src = imageSrc;
    popupImageElementInPopup.alt = imageAlt;
    popupImageCaption.textContent = imageCaption;
    openPopup(popupImage);
};

// закрытие попапов по кнопке
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closeModal(popup);
    });
});

// Включаем валидацию
enableValidation(validationConfig);

clearValidation(formElementProfile, validationConfig);
clearValidation(formElementAddCard, validationConfig);
clearValidation(formElementAvatar, validationConfig);