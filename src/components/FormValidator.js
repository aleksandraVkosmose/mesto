export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector); //buttonElement - submit
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
  _showInputError = (input, errorMessage) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  _hideInputError = (input) => {
    // Находим элемент ошибки
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    // Скрываем сообщение об ошибке
    errorElement.classList.remove(this._errorClass);
    // Очистим ошибку
    errorElement.textContent = '';
  };
  // Функция, которая проверяет валидность поля
  _isValid = (input) => {
    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input, input.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(input);
    }
  };

  //метод для очистки ошибок и управления кнопкой
  resetValidation() {
    this._toggleButtonState(); //управляем кнопкой
    this._inputList.forEach((input) => {
      this._hideInputError(input) //очищаем ошибки
    });
  }

  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = () => {
    const hasInvalidInput = this._inputList.every(input => input.validity.valid)
    // Если все инпуты валидны сделай кнопку активной
    if (hasInvalidInput) {
      this._buttonElement.removeAttribute('disabled', false);
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      //иначе сделай кнопку неактивной
    } else {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}