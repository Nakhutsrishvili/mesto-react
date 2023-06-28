import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isSending,
}) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function resetClosePopups() {
    onClose();
    reset();
  }

  function handleSubmite(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      isValid={isValid}
      onClose={resetClosePopups}
      onSubmit={handleSubmite}
      isSending={isSending}
    >
      {/* Здесь ниже указываем Children */}
      <input
        minLength={2}
        maxLength={30}
        className={`form__input ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : "form__input_type_error"
        }`}
        required
        id="title"
        name="title"
        placeholder="Название"
        type="text"
        value={values.title ? values.title : ""}
        onChange={handleChange}
        disabled={isSending}
      />
      <span id="title-error" className="form__error form__error_visible">
        {errors.title}
      </span>
      <input
        className={`form__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "form__input_type_error"
        }`}
        required
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        type="url"
        value={values.link ? values.link : ""}
        onChange={handleChange}
        disabled={isSending}
      />
      <span id="link-error" className="form__error form__error_visible">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
