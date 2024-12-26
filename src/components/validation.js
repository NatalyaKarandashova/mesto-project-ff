export { enableValidation, clearValidation, prepareFormForEditing }

// Функция для активации валидации
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement, validationConfig);
    });
};

// Функция для добавления обработчиков событий на поля формы
const setEventListener = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

// Функция проверки валидности
const isValid = (formElement, inputElement, validationConfig) => {
    const pattern = new RegExp(inputElement.dataset.pattern); // Получаем паттерн из атрибута data-pattern
    const errorMessage = inputElement.dataset.errorMessage; // Сообщение об ошибке из атрибута data-error-message

    if (inputElement.validity.valueMissing) {
        showInputError(formElement, inputElement, 'Вы пропустили это поле', validationConfig);
    } else if (inputElement.value.length < 2) {
        showInputError(formElement, inputElement, 'Минимальная длина текста: 2 символа', validationConfig);
    } else if (inputElement.value.length > inputElement.dataset.maxLength) {
        showInputError(formElement, inputElement, `Максимум ${inputElement.dataset.maxLength} символов`, validationConfig);
    } else if (!pattern.test(inputElement.value)) {
        showInputError(formElement, inputElement, errorMessage, validationConfig);
        inputElement.setCustomValidity(errorMessage);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
        inputElement.setCustomValidity('');
    }
};

//функция для проверки подставленных данных
const prepareFormForEditing = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        isValid(formElement, inputElement, validationConfig);
    });

    toggleButtonState(inputList, buttonElement, validationConfig);
};

// Функция для отображения ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass); // Добавляем класс ошибки
    errorElement.textContent = errorMessage; // Устанавливаем текст ошибки
    errorElement.classList.add(validationConfig.errorClass); // Показываем текст ошибки
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

// Функция для проверки наличия невалидных полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// Функция для сброса ошибок валидации
const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });

    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

