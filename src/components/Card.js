import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`photo__button-delete ${isOwn ? 'photo__button-delete_active' : ""}`)
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`photo__button-like ${isLiked ? 'photo__button-like_active' : ""}`)

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick () {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
      <li className="photo">
        <button 
        className={cardDeleteButtonClassName} 
        onClick={handleDeleteClick}
        type="button" 
        />
        <img
          className="photo__item"
          onClick={handleClick}
          src={props.card.link}
          alt={props.card.name}
        />
        <div className="photo__description">
          <h2 className="photo__title">{props.card.name}</h2>
          <div className="photo__likebox">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick }
              type="button"
            />
            <div className="photo__count">{props.likeCounter}</div>
          </div>
        </div>
      </li>
  );
}

export default Card;
