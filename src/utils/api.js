class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._responseResult);
  }

  _responseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    });
  }
  getUserData() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    });
  }
  addNewCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  updateUserData(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }
  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.addLike(card);
    } else {
      return this.deleteLike(card);
    }
  }

  addLike(data) {
    return this._request(`${this._url}/cards/likes/${data}`, {
        method: "PUT",
        headers: this._headers
      });
  }

  deleteLike(data) {
    return this._request(`${this._url}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  updateAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "76d23833-7ba9-4f79-9b2a-5a0913e0b1e5",
    "content-type": "application/json",
  },
});

export default api;
