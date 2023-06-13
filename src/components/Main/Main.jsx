import editImage from '../../images/EditButton.svg'
import addImage from '../../images/Vector.png'
import { useEffect, useState } from "react";
import api from '../../utils/api';
import Card from '../Card/Card';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {

  const [userAvatar, setUserAvatar] = useState('')
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userCards, setUserCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name)
        setUserDescription(dataUser.about)
        setUserAvatar(dataUser.avatar)
        dataCard.forEach(element => element.myid = dataUser._id);
        setUserCards(dataCard);
      })
  }, [])
  return (
    <main className="content">
      <div className="profile">
        <button
          aria-label="Редактировать"
          type="button"
          className="profile__avatar-edit-button"
          onClick={onEditAvatar}
        >
          <img src={userAvatar} alt="Картинка" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name"> {userName}</h1>
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
          <p className="profile__about">{userDescription}</p>
        </div>
        <button
          aria-label="Добавить"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            src={addImage}
            alt="Рисунок"
            className="profile__add-image"
          />
        </button>
      </div>
      <section className="elements">
        {userCards.map(data => {
          return (
            <ul className="elements__lists" key={data._id}>
              <Card card={data} onCardClick={onCardClick} />
            </ul>
          )
        })}
      </section>
    </main>
  )
}