import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSending,
}) {
  const input = useRef();

  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function resetClosePopups() {
    onClose();
    reset();
  }

  function handleSubmite(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      // Здесь ниже указываем Props
      name="avatar-update"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetClosePopups}
      onSubmit={handleSubmite}
      isSending={isSending}
      isValid={isValid}
    >
      {/* Здесь ниже указываем Children */}
      <input
        ref={input}
        className={`form__input ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ""
            : "form__input_type_error"
        }`}
        required=""
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        type="url"
        value={values.avatar ? values.avatar : ""}
        disabled={isSending}
        onChange={handleChange}
      />
      <span id="avatar-error" className="form__error form__error_visible">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
