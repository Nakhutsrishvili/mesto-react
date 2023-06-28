export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container-image"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__popup-image" />
        <h2 className="popup__image-caption">{card.name}</h2>
      </div>
    </div>
  );
}
