class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _responseResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseResult(res);
    });
  }
  setLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseResult(res);
    });
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseResult(res);
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
