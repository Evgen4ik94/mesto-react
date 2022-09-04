import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithImage from "./PopupWithImage";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  function handleEditProfileClick() {
    setEditProfilePopupOpenClose(true);
  }
  function handleAddPlaceClick() {
    setAddCardPopupOpenClose(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpenClose(true);
  }

  function handleImagePopupOpen(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <>
      <Header />
      <Main
        onCardClick={handleImagePopupOpen}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <PopupWithImage card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name="form"
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
          <input
            className="popup__input popup__input_type_name"
            id="name-item"
            type="text"
            name="name"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__input-error" id="name-item-error"></span>
          <input
            className="popup__input popup__input_type_about"
            id="about-item"
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__input-error" id="about-item-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="form"
        title="Новое место"
        submitText="Создать"
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
      >
          <input
            className="popup__input popup__input_type_caption"
            id="title-item"
            type="text"
            name="name"
            placeholder="Название"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="popup__input-error"id="title-item-error"></span>
          <input
            className="popup__input popup__input_type_link"
            id="link-item"
            type="url"
            name="link"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="popup__input-error" id="link-item-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Изменить аватар"
        submitText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
          <input
            className="popup__input popup__input_type_link"
            id="avatar-item"
            type="url"
            name="avatar"
            placeholder="Ссылка на изображение"
            required
          />
          <span className="popup__input-error" id="avatar-item-error"></span>
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Удалить карточку?"
        submitText="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>
    </>
  );
}

export default App;
