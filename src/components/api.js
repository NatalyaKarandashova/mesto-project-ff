
const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
        authorization: 'b36effa6-ff64-4a3c-86fb-6ba87b19e57d',
        'Content-Type': 'application/json'
    }
};

//функция обработки ответа
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

//функция для получения данных пользователя
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse)
};

//функция для получения карточек 
export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(handleResponse)
};

//функция обновления данных пользователя
export const updateUserProfile = (name, about) => {
    return fetch (`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(handleResponse)
};

//функция добавления новой карточки
export const addNewCards = (placeName, placeLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: placeName,
            link: placeLink
        })
    })
    .then(handleResponse)
};

//функция удаления карточки
export const deleteCards = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
};

//функция для постановки лайка на карточку
export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(handleResponse)
};

//функция для удаления лайка
export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
};

//функция обновыления аватара пользователя
export const updateAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(handleResponse)
};