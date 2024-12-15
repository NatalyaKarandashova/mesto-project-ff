import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeClick} from '../components/card.js';
import { openPopup, closeModalOnEsc, closePopup } from '../components/modal.js';

//объявление глобальных переменных

const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCord = document.querySelector('.popup_type_new-card');
const closeButtonInPopupAddCard = popupAddCord.querySelector('.popup__close');
const closeButtonInPopupEditPrifile = popupEditProfile.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const fieledTitle = document.querySelector('.profile__title');
const fieledDescription = document.querySelector('.profile__description');
const saveCloseButton = popupEditProfile.querySelector('.popup__button');
const newCardName = popupAddCord.querySelector('.popup__input_type_card-name');
const newCardUrl = popupAddCord.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_type_image');
const popupImageElementInPopup = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popuupCloseButtonInPopupImage = popupImage.querySelector('.popup__close');
const saveCloseButtonInNewCard = popupAddCord.querySelector('.popup__button');

initialCards.forEach((cardData) => {
    const cardElem = createCard (cardData, deleteCard, likeClick, OpenImageInPopup);
    cardList.append(cardElem);
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = fieledTitle.textContent;
    jobInput.value = fieledDescription.textContent;
    openPopup(popupEditProfile);

});

closePopup(closeButtonInPopupEditPrifile, popupEditProfile);

addCardButton.addEventListener('click', () => {
    newCardName.value = '';
    newCardUrl.value = '';
    openPopup(popupAddCord);
});

closePopup(closeButtonInPopupAddCard, popupAddCord);

//закрытие попапа кликом на оверлей
popupEditProfile.addEventListener('click', (evt) => {
    if (evt.target === popupEditProfile) {
        popupEditProfile.classList.remove('popup_is-opened');
    }
});
popupAddCord.addEventListener('click', (evt) => {
    if (evt.target === popupAddCord) {
        popupAddCord.classList.remove('popup_is-opened');
    }
});

document.addEventListener('keydown', (evt) => {
    closeModalOnEsc(popupAddCord);
});
document.addEventListener('keydown', (evt) => {
    closeModalOnEsc(popupEditProfile);
});

function handleFormSubmit(evt) {
    evt.preventDefault();

    fieledTitle.textContent = nameInput.value;
    fieledDescription.textContent = jobInput.value;
};

formElement.addEventListener('submit', handleFormSubmit); 

saveCloseButton.addEventListener('click', (evt) => {
    popupEditProfile.classList.remove('popup_is-opened');
});

popupAddCord.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const newCardValue = {
        name: newCardName.value,
        link: newCardUrl.value
    }

    const newCardElement = createCard(newCardValue, deleteCard, likeClick, OpenImageInPopup);
    cardList.prepend(newCardElement);

    formElement.reset();
});

saveCloseButtonInNewCard.addEventListener('click', (evt) => {
    popupAddCord.classList.remove('popup_is-opened');
});

function OpenImageInPopup (imageSrc, imageAlt, imageCaption) {
    popupImageElementInPopup.src = imageSrc;
    popupImageElementInPopup.alt = imageAlt;
    popupImageCaption.textContent = imageCaption;
    popupImage.classList.add('popup_is-opened');
};

closePopup (popuupCloseButtonInPopupImage, popupImage);

popupImage.addEventListener('click', (evt) => {
    if (evt.target === popupImage) {
        popupImage.classList.remove('popup_is-opened');
    }
});

document.addEventListener('keydown', (evt) => {
    closeModalOnEsc(popupImage);
});








