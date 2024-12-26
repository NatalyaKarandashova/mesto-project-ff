import { deleteCards, likeCard, unlikeCard } from './api'; 
 
const cardTemplate = document.querySelector('#card-template').content; 
 
export function createCard(cardData, currentUserId, deleteCard, likeClick, openImageInPopup) { 
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

    const { owner, _id: cardId, likes } = cardData;
    const isOwner = owner._id === currentUserId;

    if (isOwner) {
        deleteButtonInCard.addEventListener('click', () => { 
            deleteCard(cardId, cardElem); 
        });
    } else {
        deleteButtonInCard.remove();
    }
 
    if (likes.some((like) => like._id === currentUserId)) { 
        likeButtonInCard.classList.add('card__like-button_is-active'); 
    } 
 
    likeButtonInCard.addEventListener('click', () => { 
        likeClick( 
            cardId,  
            likes.some((like) => like._id === currentUserId),  
            likeCountElement,  
            likeButtonInCard,
            currentUserId  
        ); 
    }); 
 
    imageInCard.addEventListener('click', () => { 
        openImageInPopup(cardData.link, cardData.name, cardData.name); 
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
 
export function likeClick(cardId, isLiked, likeCountElement, likeButtonInCard, currentUserId) { 
    const toggleLike = isLiked ? unlikeCard : likeCard; 
 
    toggleLike(cardId) 
        .then((updatedCard) => { 
 
            likeCountElement.textContent = updatedCard.likes.length;  
 
            const isLikedByCurrentUser = updatedCard.likes.some( 
                (like) => like._id === currentUserId 
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