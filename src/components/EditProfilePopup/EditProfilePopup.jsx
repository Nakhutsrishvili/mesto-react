import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSending,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    isInputValid,
    reset,
    setValue,
    handleChange,
  } = useFormValidation();

  useEffect(() => {
    setValue("username", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser, setValue]);

  function resetClosePopups() {
    onClose();
    reset({ username: currentUser.name, about: currentUser.about });
  }

  function handleSubmite(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, about: values.about }, reset);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetClosePopups}
      isValid={isValid}
      isSending={isSending}
      onSubmit={handleSubmite}
    >
      {/* Здесь ниже указываем Children */}
      <input
        name="username"
        id="name"
        minLength={2}
        maxLength={40}
        className={`form__input ${
          isInputValid.username === undefined || isInputValid.username
            ? ""
            : "form__input_type_error"
        }`}
        required
        placeholder="Введите имя?"
        type="text"
        value={values.username ? values.username : ""}
        onChange={handleChange}
        disabled={isSending}
      />
      <span id="name-error" className="form__error form__error_visible">
        {errors.username}
      </span>
      <input
        name="about"
        id="job"
        minLength={2}
        maxLength={200}
        className={`form__input ${
          isInputValid.about === undefined || isInputValid.about
            ? ""
            : "form__input_type_error"
        }`}
        required
        placeholder="Род занятия или увлечения?"
        type="text"
        value={values.about ? values.about : ""}
        onChange={handleChange}
        disabled={isSending}
      />
      <span id="job-error" className="form__error form__error_visible">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}
