function PopupWithImage(props) {
  return (
    <div
      className={`popup popup_type_fullscreen-image ${
        props.card.link && "popup_opened"
      }`}
    >
      <figure className="popup__image-container">
        <button
          className="popup__button-close"
          onClick={props.onClose}
          type="button"
        ></button>
        <img
          className="popup__image"
          src={`${props.card.link}`}
          alt={props.card.name}
        />
        <figcaption className="popup__image-caption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default PopupWithImage;
