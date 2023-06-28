import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState, useCallback, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  //states of popup
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({}); // принимаем объект при клике по карточке
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // отвечает за активацию анимации
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isSending, setSending] = useState(false);

  //states of contexts
  const [currentUser, setCurrentUser] = useState({});

  //states of cards
  const [userCards, setUserCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteCardId, setdeleteCardId] = useState("");

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListener();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListener();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListener();
  }

  function handleCard(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    setEventListener();
  }

  function handleDeletePopupClick(cardId) {
    setdeleteCardId(cardId);
    setDeletePopupOpen(true);
    setEventListener();
  }

  function setEventListener() {
    document.addEventListener("keydown", closePopupsByEsc);
  }

  // Запоминаем состояние
  const helperFunctionForClosePopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setDeletePopupOpen(false);
  }, []);

  // Запоминаем состояние
  const closePopupsByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        helperFunctionForClosePopups();
        document.removeEventListener("keydown", closePopupsByEsc);
      }
    },
    [helperFunctionForClosePopups]
  );

  const closePopups = useCallback(() => {
    helperFunctionForClosePopups();
    document.removeEventListener("keydown", closePopupsByEsc);
  }, [helperFunctionForClosePopups, closePopupsByEsc]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setUserCards(dataCard);
        setIsLoading(false);
      })
      .catch((error) => console.error(`Ошибка при загрузке страницы ${error}`));
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setSending(true);
    api
      .deleteCards(deleteCardId)
      .then(() => {
        setUserCards(
          userCards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closePopups();
        setSending(false);
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
      .finally(() => setSending(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setSending(true);
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closePopups();
        reset();
        setSending(false);
      })
      .catch((error) => console.error(`Ошибка редактирования профиля ${error}`))
      .finally(() => setSending(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setSending(true);
    api
      .setUpdateAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closePopups();
        reset();
        setSending(false);
      })
      .catch((error) => console.error(`Ошибка обновления аватара ${error}`))
      .finally(() => setSending(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setSending(true);
    api
      .addCard(dataCard)
      .then((res) => {
        setUserCards([res, ...userCards]);
        closePopups();
        reset();
        setSending(false);
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`))
      .finally(() => setSending(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCard}
          onDelete={handleDeletePopupClick}
          userCards={userCards}
          isLoading={isLoading}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          isSending={isSending}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
          isSending={isSending}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          isSending={isSending}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="delete-card-confirm"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closePopups}
          onSubmit={handleDeleteSubmit}
          isSending={isSending}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closePopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
