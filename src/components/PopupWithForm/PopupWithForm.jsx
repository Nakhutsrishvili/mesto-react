export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSending,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className="form__title">{title}</h2>
        <form
          noValidate
          className="form"
          autoComplete="off"
          name={name}
          method="post"
          onSubmit={onSubmit}
        >
          {children}
          <button
            disabled={isSending}
            aria-label="Сохранить"
            type="submit"
            className={`form__submit-button ${
              isValid ? "" : "form__submit-button_disabled"
            }`}
          >
            {isSending ? "Загрузка..." : titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
