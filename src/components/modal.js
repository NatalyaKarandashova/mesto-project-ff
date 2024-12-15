export { openPopup, closeModalOnEsc, closePopup };

//функция открытия попап
function openPopup (popupName) {
    popupName.classList.add('popup_is-opened');
};

//функция закрытия через esc
function closeModalOnEsc(popup) {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_is-opened')) {
            popup.classList.remove('popup_is-opened');
        }
    });
};

//функция закрытия попапа по крестику
function closePopup(closeButton, popup) {
    closeButton.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
    });
};