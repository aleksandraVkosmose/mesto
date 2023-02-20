export default class Api {
  constructor(options) {
    this._options = options;
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  // Добавление новой карточки через попап
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleOriginalResponse)
  }

  // setUserAvatar(data) {
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: data.avatar
  //     })
  //   }).then(this._handleOriginalResponse)
  // }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleOriginalResponse)
  }

  // Ставим лайк карточке
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(res => this._handleOriginalResponse(res))
  }

  // Удаляем лайк
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._handleOriginalResponse(res));
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  // Редактирование информации о пользователе через попап
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(res => this._handleOriginalResponse(res))
  }

  // Редактирование аватара пользователя через попап
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(res => this._handleOriginalResponse(res));
  }
}