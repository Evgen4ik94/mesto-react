import React from "react";
import Card from "./Card";
import api from "../utils/api";

function Main(props) {
  const [userName, setUserName] = React.useState("Евгений Миляков");
  const [userDescription, setUserDescription] = React.useState(
    "Инженер-конструктор"
  );
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((result) => {
        const [userData, cardList] = result;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <section className="profile">
          <div className="profile__avatar">
            <button onClick={props.onEditAvatar} className="profile__avatar-button">
              <img
                src={userAvatar}
                alt="Фото профиля"
                className="profile__image"
              />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__name-box">
              <h1 className="profile__name text">{userName}</h1>
              <button
                className="profile__button profile__button-edit"
                onClick={props.onEditProfile}
                type="button"
              ></button>
            </div>
            <div className="profile__prof text">{userDescription}</div>
          </div>
        <button
          className="profile__button profile__button-add"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              likeCounter={card.likes.length}
              onCardClick={props.onCardClick}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
