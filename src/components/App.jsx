import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({}); // принимаем объект при клике по карточке
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // отвечает за активацию анимации

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCard(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closePopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }
  return (
    <div className="page">
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCard}
      />

      <Footer />

      <PopupWithForm
        // Здесь ниже указываем Props
        name="avatar-update"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closePopups}
      >
        {/* Здесь ниже указываем Children */}
        <input
          className="form__input"
          required=""
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          type="url"
        />
        <span id="avatar-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closePopups}
      >
        {/* Здесь ниже указываем Children */}
        <input
          minLength={2}
          maxLength={40}
          className="form__input"
          required=""
          id="name"
          name="username"
          placeholder="Введите имя?"
          type="text"
        />
        <span id="name-error" className="form__error" />
        <input
          minLength={2}
          maxLength={200}
          className="form__input"
          required=""
          id="job"
          name="about"
          placeholder="Род занятия или увлечения?"
          type="text"
        />
        <span id="job-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name="add-cards"
        title="Новое место"
        titleButton="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closePopups}
      >
        {/* Здесь ниже указываем Children */}
        <input
          minLength={2}
          maxLength={30}
          className="form__input"
          required=""
          id="title"
          name="title"
          placeholder="Название"
          type="text"
        />
        <span id="title-error" className="form__error" />
        <input
          className="form__input"
          required=""
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          type="url"
        />
        <span id="link-error" className="form__error" />
      </PopupWithForm>

      <PopupWithForm
        name="delete-card-confirm"
        title="Вы уверены?"
        titleButton="Да"
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closePopups}
      />
    </div>
  );
}

export default App;
