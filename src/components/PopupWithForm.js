import React from "react";

function PopupWithForm({isOpen, onClose, onSubmit, name, title, submitText, children}) { 
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <form 
          onSubmit={onSubmit} //Добавили пропс onSubmit
          className="popup__form" 
          name={name} 
        >
          <button
            className="popup__button-close"
            onClick={onClose}
            type="button">
          </button>
          <h2 className="popup__head">{title}</h2>
            {children}
          <button className="popup__button-submit" type="submit">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
