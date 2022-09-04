import React from "react";

function Card(props) {
  const [liked, setLiked] = React.useState(false);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function likeClick() {
    setLiked(!liked);
  }
  return (
    <>
      <li className="photo">
        <button className="photo__button-delete" type="button"></button>
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
              className={`photo__button-like ${liked && "card__like_active"}`}
              onClick={likeClick}
              type="button"
            ></button>
            <div className="photo__count">{props.likeCounter}</div>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
