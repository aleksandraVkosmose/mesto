
const showInputError = (settings, input, errorMessage) => {
  const errorElement = document.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};
const hideInputError = (settings, input) => {
// Находим элемент ошибки
  const errorElement = document.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
// Скрываем сообщение об ошибке
  errorElement.classList.remove(settings.errorClass);
// Очистим ошибку
  errorElement.textContent = '';
};
// Функция, которая проверяет валидность поля
const isValid = (settings, input) => {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(settings, input, input.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(settings, input);
  }
};

// Функция сделает кнопку неактивной
const disableButton = (buttonElement, settings) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(settings.inactiveButtonClass);
}

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (settings, inputList, buttonElement) => {
  const hasInvalidInput = inputList.every(input => input.validity.valid)
  // Если все инпуты валидны сделай кнопку активной
  if (hasInvalidInput) {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(settings.inactiveButtonClass);
  } else{
    disableButton(buttonElement, settings)
  }
}; 

const enableValidation = (settings) => {
  const {formSelector, inputSelector, submitButtonSelector, ...resetSettings} = settings
  const formList = [...document.querySelectorAll(settings.formSelector)];
  formList.forEach(formElement => {
    const inputList = [...formElement.querySelectorAll(inputSelector)];
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(settings, inputList, buttonElement);

    inputList.forEach(input => {
      input.addEventListener('input', () => {
       isValid(resetSettings, input)
        toggleButtonState(settings, inputList, buttonElement);
      });
    });
  });
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 
// Вызовем функцию
enableValidation(settings);