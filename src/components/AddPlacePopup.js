import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [buttonText, setButtonText] = React.useState("Создать");
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) { //Ф-я изменения названия
        setName(e.target.value);
    }

    function handleLinkChange(e) { //Ф-я изменения ссылки
        setLink(e.target.value)
    }

    function handleClosePopup() { //Ф-я ручного закрытия попапа
        props.onClose();
        setTimeout(() => { //Очищаем инпуты
            setName("");
            setLink("");
        }, 200);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setButtonText("Создание...");
        props
            .onAddPlace({name, link})
            .then(() => handleClosePopup())
            .finally(() => {
                setButtonText("Создать");
            })
    }
    
    return (
        <PopupWithForm
          name="form"
          title="Новое место"
          submitText={buttonText}
          isOpen={props.isOpen}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
        >
            <input
              className="popup__input popup__input_type_caption"
              id="title-item"
              type="text"
              name="name"
              placeholder="Название"
              minLength="1"
              maxLength="30"
              value={name}
              onChange={handleNameChange}
              required
            />
            <span className="popup__input-error"id="title-item-error"></span>
            <input
              className="popup__input popup__input_type_link"
              id="link-item"
              type="url"
              name="link"
              placeholder="Ссылка на изображение"
              value={link}
              onChange={handleLinkChange}
              required
            />
            <span className="popup__input-error" id="link-item-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;