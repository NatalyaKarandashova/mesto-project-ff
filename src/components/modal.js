export { openPopup, closeModal };

//функция открытия попап
function openPopup (popupName) {
    popupName.classList.add('popup_is-opened');
    popupName.addEventListener('click', closeOnOverlay);
    document.addEventListener('keydown', closeOnEsc);
};

//универсальная функция закрытия попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeOnOverlay);
    document.removeEventListener('keydown', closeOnEsc);
};

//обработчик для закрытия на esc
function closeOnEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
};

//закртыие по клику на оверлей
function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
};