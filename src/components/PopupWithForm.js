import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submit}) {
    super(popupSelector);
    this._submitForm = submit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this._inputList = Array.from(this._popupSelector.querySelectorAll(".popup__input"));
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
}