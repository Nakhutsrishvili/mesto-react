import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Like from "../../components/Like/Like.jsx";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <li className="element">
      {currentUser._id === card.owner._id && (
        <button
          aria-label="Удалить"
          type="button"
          className="element__group-delete"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__group">
        <h2 className="element__group-title">{card.name}</h2>
        <div className="element__like-container">
          <Like likes={card.likes} myid={currentUser._id} cardid={card._id} />
        </div>
      </div>
    </li>
  );
}
