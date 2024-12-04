
import './pages/index.css';
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardData, deleteCard) {

    const cardElem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imageInCard = cardElem.querySelector('.card__image');
    const deleteButtonInCard = cardElem.querySelector('.card__delete-button');
    const descriptionInCard = cardElem.querySelector('.card__description');

    imageInCard.src = cardData.link;
    imageInCard.alt = cardData.name;
    descriptionInCard.textContent = cardData.name;

    deleteButtonInCard.addEventListener('click', function() {
        deleteCard(cardElem);
    })

    return cardElem;
}

function deleteCard (cardData) {
    cardData.remove();
}

const cardList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    const cardElem = createCard (cardData, deleteCard);
    cardList.append(cardElem);
});