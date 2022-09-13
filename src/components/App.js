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
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpenClose] = React.useState(false); //Стейт попапа ред. профиля
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
    setIsEditProfilePopupOpenClose(!isEditProfilePopupOpen);
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

  // Закрываем попапы (изменяем открытое состояние с true на false) и очищаем поля
  function closeAllPopups() {
    setIsEditProfilePopupOpenClose(false);
    setAddCardPopupOpenClose(false);
    setEditAvatarPopupOpenClose(false);
    setImagePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  //Делаем закрытие попапов на Escape
  //Создаем переменную isOpen снаружи useEffect, в которой следим за всеми состояниями попапов. 
  //Если хоть одно состояние true или не null, то какой-то попап открыт, значит, навешивать нужно обработчик.
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddCardPopupOpen || selectedCard.link || isConfirmDeletePopupOpen

  React.useEffect(() => {
    //Объявляем функцию внутри useEffect, чтобы она не теряла свою ссылку при обновлении компонента.
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => { //И не забываем удалять обработчик в clean up функции через return
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) //А также массив зависимостей c isOpen, чтобы отслеживать изменение этого показателя открытости. 
  //Как только он становится true, то навешивается обработчик, когда в false, тогда удаляется обработчик.

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

  function handleDeleteSubmit(card) {
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
              .then((res) => {
                setCurrentUser(res);
              })
              .catch((err) => console.log(err))
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
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          loader={userInfoGet}
          onCardClick={handleImagePopupOpen}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteClick}
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
          onCardDelete={handleDeleteSubmit}
        />
      </CurrentUserContext.Provider>
  );
}

export default App;
