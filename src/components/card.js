import { deleteCards, likeCard, unlikeCard } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, deleteCard, likeClick, openImageInPopup) {
    const cardElem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imageInCard = cardElem.querySelector('.card__image');
    const deleteButtonInCard = cardElem.querySelector('.card__delete-button');
    const titleInCard = cardElem.querySelector('.card__title');
    const likeButtonInCard = cardElem.querySelector('.card__like-button');
    const likeCountElement = cardElem.querySelector('.card__likes-count');

    imageInCard.src = cardData.link;
    imageInCard.alt = cardData.name;
    titleInCard.textContent = cardData.name;
    likeCountElement.textContent = cardData.likes.length;

    if (cardData.likes.some((like) => like._id === cardData.currentUserId)) {
        likeButtonInCard.classList.add('card__like-button_is-active');
    }

    deleteButtonInCard.addEventListener('click', () => {
        deleteCard(cardData._id, cardElem);
    });

    likeButtonInCard.addEventListener('click', () => {
        likeClick(
            cardData._id, 
            cardData.likes.some((like) => like._id === cardData.currentUserId), 
            likeCountElement, 
            likeButtonInCard,
            cardData
        );
    });

    imageInCard.addEventListener('click', () => {
        openImageInPopup(cardData.link, cardData.name);
    });

    return cardElem;
};

export function deleteCard(cardId, cardElement) {
    deleteCards(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.error('Ошибка при удалении карточки:', err);
        });
};

export function likeClick(cardId, isLiked, likeCountElement, likeButtonInCard, cardData) {
    const toggleLike = isLiked ? unlikeCard : likeCard;

    toggleLike(cardId)
        .then((updatedCard) => {

            likeCountElement.textContent = updatedCard.likes.length;
            cardData.likes = updatedCard.likes;

            const isLikedByCurrentUser = updatedCard.likes.some(
                (like) => like._id === cardData.currentUserId
            );

            if (isLikedByCurrentUser) {
                likeButtonInCard.classList.add('card__like-button_is-active');
            } else {
                likeButtonInCard.classList.remove('card__like-button_is-active');
            }
        })
        .catch((err) => {
            console.error('Ошибка при изменении лайка:', err);
        });
};  