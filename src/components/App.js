import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
 

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpenClose] = React.useState(false); //Стейт попапа ред. профиля
  const [isAddCardPopupOpen, setAddCardPopupOpenClose] = React.useState(false); //Стейт попапа добавления карточки
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpenClose] = React.useState(false); //Стейт попапа изменения аватара
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false); //Стейт попапа удаления карточки
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({}); //Стейт-значение для провайдера контекста
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); //Стейт попапа карточки
  const [cards, setCards] = React.useState([]);
  const [userInfoGet, setUserInfoGet] = React.useState(false); //Стейт получена/не получена информация о пользователе

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userInfo, cardList]) => {
        setCurrentUser(userInfo);
        setCards(cardList);
        setUserInfoGet(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() { //Открытие попапа ред. профиля по клику (меняем состояние на true)
    setEditProfilePopupOpenClose(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() { //Открытие попапа добавления карточки по клику (меняем состояние на true)
    setAddCardPopupOpenClose(!isAddCardPopupOpen);
  }

  function handleEditAvatarClick() { //Открытие попапа ред. аватара по клику (меняем состояние на true)
    setEditAvatarPopupOpenClose(!isEditAvatarPopupOpen);
  }

  function handleImagePopupOpen(card) { //Открытие попапа карточки по клику (меняем состояние на true)
    setSelectedCard(card);
    setImagePopupOpen(!isImagePopupOpen);
  }

  function handleTrashClick() {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
  }

  // Закрываем попапы (изменяем открытое состояние с true на false) и очищаем поля
  function closeAllPopups() {
    setEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  //Добавим функцию лайка
  function handleLikeClick (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося c новой карточкой
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.log(err));
  } 
  
  function handleDeleteClick() {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen)
  }

  function handleDeleteClick(card) {
    return api
              .deleteCard(card._id)
              .then((newCard) => {
                const newCards = cards.filter((c) =>
                  c._id === card._id ? "" : newCard
                );
                setCards(newCards);
              })
              .catch((err) => console.log(err));
  }


  function handleUpdateUser(data) { //Добавляем обработчик (п. 3)
    return api
              .updateUserData(data)
              .then((res) => {setCurrentUser(res);})
              .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    return api
              .updateAvatar(data)
              .catch((err) => console.log(err))
              .then((res) => {
                setCurrentUser(res);
              });
  }

  function handleAddPlaceSubmit(card) {
    return api
              .addNewCard(card)
              .then((newCard) => {
                setCards([newCard, ...cards]);
              })
              .catch((err) => console.log(err));
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          loader={userInfoGet}
          onCardClick={handleImagePopupOpen}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleLikeClick}
          onCardDelete={handleTrashClick}
          cards={cards}
        />
        <Footer />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} //Добавляем пропс с обработчиком
        />
        <AddPlacePopup 
          isOpen={isAddCardPopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleDeleteClick}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
