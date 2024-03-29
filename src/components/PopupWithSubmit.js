import Popup from "./Popup.js";
export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {

    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-confirm');
  }
  //принимает коллбэк на удаление карточки
  setSubmitCallback(callback) {
    this._handleSubmit = callback;
  }

  // удаление карточки по нажатию на submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}