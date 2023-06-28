import editImage from "../../images/EditButton.svg";
import addImage from "../../images/Vector.png";
import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Spinner from "../Spinner/Spinner.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  userCards,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <button
          aria-label="Редактировать"
          type="button"
          className="profile__avatar-edit-button"
          onClick={onEditAvatar}
        >
          <img
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="Картинка"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">
              {" "}
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              aria-label="Редактировать"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            >
              <img
                src={editImage}
                alt="Рисунок"
                className="profile__edit-image"
              />
            </button>
          </div>
          <p className="profile__about">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          aria-label="Добавить"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img src={addImage} alt="Рисунок" className="profile__add-image" />
        </button>
      </div>
      <section className="elements">
        {isLoading ? (
          <Spinner />
        ) : (
          userCards.map((data) => {
            return (
              <ul className="elements__lists" key={data._id}>
                <Card
                  card={data}
                  onCardClick={onCardClick}
                  onDelete={onDelete}
                />
              </ul>
            );
          })
        )}
      </section>
    </main>
  );
}
