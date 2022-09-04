import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <form className="popup__form" name={props.name} noValidate>
          <button
            className="popup__button-close"
            onClick={props.onClose}
            type="button">
          </button>
          <h2 className="popup__head">{props.title}</h2>
            {props.children}
          <button className="popup__button-submit" type="submit" disabled>
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
