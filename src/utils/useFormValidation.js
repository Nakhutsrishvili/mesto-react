import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({}); //стейт отвечает за values, он будет записывать при вводе инпута значение.
  const [errors, setErrors] = useState({}); // стейт для ошибки
  const [isValid, setIsValid] = useState(false); // стейт на валидацию формы (булевый), для кнопки
  const [isInputValid, setIsInputValid] = useState({}); // Стейт для подчеркивания

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((previousValues) => {
      return { ...previousValues, [name]: value };
    });

    setErrors((previousErrors) => {
      return { ...previousErrors, [name]: validationMessage };
    });

    setIsInputValid((previousIsInputValid) => {
      return { ...previousIsInputValid, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsValid(false);
    setIsInputValid({});
  }

  // Устанавливаем первоначальные данные
  const setValue = useCallback((name, value) => {
    setValues((previousValues) => {
      return { ...previousValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isValid,
    isInputValid,
    reset,
    setValue,
    handleChange,
  };
}
