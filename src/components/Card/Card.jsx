export default function Card({ card, onCardClick}) {
    return (
        <li className="element">
            <button
                aria-label="Удалить"
                type="button"
                className="element__group-delete"
            />
            <img
                src={card.link}
                alt={card.name}
                className="element__image"
                onClick={() => onCardClick({ link: card.link, name: card.name })}
            />
            <div className="element__group">
                <h2 className="element__group-title">{card.name}</h2>
                <div className="element__like-container">
                    <button
                        aria-label="Лайкнуть"
                        type="button"
                        className="element__group-like"
                    />
                    <span className="element__counter" />
                </div>
            </div>
        </li>
    )
}