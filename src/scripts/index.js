import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeClick} from '../components/card.js';
import { openPopup } from '../components/modal.js';

//объявление глобальных переменных

const cardList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const addCardButton = document.querySelector('.profile__add-button');
const popupAddCord = document.querySelector('.popup_type_new-card');
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

initialCards.forEach((cardData) => {
    const cardElem = createCard (cardData, deleteCard, likeClick, openImageInPopup);
    cardList.append(cardElem);
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = fieledTitle.textContent;
    jobInput.value = fieledDescription.textContent;
    openPopup(popupEditProfile);

});

addCardButton.addEventListener('click', () => {
    newCardName.value = '';
    newCardUrl.value = '';
    openPopup(popupAddCord);
});

function handleFormSubmitProfile(evt) {
    evt.preventDefault();

    fieledTitle.textContent = nameInput.value;
    fieledDescription.textContent = jobInput.value;
};

formElementProfile.addEventListener('submit', handleFormSubmitProfile); 

formElementAddCard.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const newCardValue = {
        name: newCardName.value,
        link: newCardUrl.value
    }

    const newCardElement = createCard(newCardValue, deleteCard, likeClick, openImageInPopup);
    cardList.prepend(newCardElement);

    formElementAddCard.reset();
});

function openImageInPopup (imageSrc, imageAlt, imageCaption) {
    popupImageElementInPopup.src = imageSrc;
    popupImageElementInPopup.alt = imageAlt;
    popupImageCaption.textContent = imageCaption;
    popupImage.classList.add('popup_is-opened');
};











