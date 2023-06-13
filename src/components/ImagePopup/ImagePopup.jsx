export default function ImagePopup({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_image ${isOpen && 'popup_opened'}`}>
            <div className="popup__container-image">
                <button aria-label="Закрыть" type="button" className="popup__close" onClick={onClose} />
                <img src={card.link} alt={card.name} className="popup__popup-image" />
                <h2 className="popup__image-caption">{card.name}</h2>
            </div>
        </div>
    )
} 
