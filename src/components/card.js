export { createCard, deleteCard, likeClick};

const cardTemplate = document.querySelector('#card-template').content;

//функция создания карточки createCard
function createCard (cardData, deleteCard, likeClick, OpenImageInPopup) {

    const cardElem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const imageInCard = cardElem.querySelector('.card__image');
    const deleteButtonInCard = cardElem.querySelector('.card__delete-button');
    const titleInCard = cardElem.querySelector('.card__title');
    const likeButtonInCard = cardElem.querySelector('.card__like-button');
    
    imageInCard.src = cardData.link;
    imageInCard.alt = cardData.name;
    titleInCard.textContent = cardData.name;

    deleteButtonInCard.addEventListener('click', function() {
        deleteCard(cardElem);
    });

    likeButtonInCard.addEventListener('click', function() {
        likeClick(likeButtonInCard);
    });

    //Обработчик клика по картинке, чтобы открыть попап с картинкой
    imageInCard.addEventListener('click', () => {
        OpenImageInPopup(cardData.link, cardData.name, cardData.name);
    })

    return cardElem;
};

//функция удаления карточки deleteCard
function deleteCard (cardData) {
    cardData.remove();
};

//функция лайка likeClick
function likeClick (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};