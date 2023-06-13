export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button aria-label="Закрыть" type="button" className="popup__close" onClick={onClose} />
                <h2 className="form__title">{title}</h2>
                <form noValidate="" className="form" autoComplete="off" name={name} method="post">
                    {children}
                    <button aria-label="Сохранить" type="submit" className="form__submit-button">{titleButton || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    )
}