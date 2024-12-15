export { openPopup };

//функция открытия попап
function openPopup (popupName) {
    popupName.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
};

//универсальная функция закрытия попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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

const closeButtons = document.querySelectorAll('.popup__close');
const saveButtons = document.querySelectorAll('.popup__button');

//закрытие модального окна при сохранении новых данных
saveButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    })
})

//закрытие по кнопке кретик
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        closeModal(popup);
    })
});

//закртыие по клику на оверлей
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target); 
    }
});