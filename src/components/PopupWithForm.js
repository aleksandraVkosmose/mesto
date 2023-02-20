import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._submitForm = submit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
    this._submitBtn = this._popup.querySelector('.popup__button-save');
    this._submitBtnText = this._submitBtn.textContent
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
  close() {
    this._form.reset();
    super.close();
  }

  // Изменяем состояние кнопки во время загрузки
  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
