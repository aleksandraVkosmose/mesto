import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
    this._formSelector = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._popup.querySelectorAll(".popup__input"));
}
//собирает данные полей формы
  _getInputValues(){
//создаем пустой объект
    this._formValues = {};
//собираем в него значения всех полей из формы, с ключами объекта = атрибутами каждого инпута
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

//перезапишем родительские слушатели - добавим обработчик события формы
  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

   //перезапишем родительский метод закрытия, чтобы сбрасывалась форма
   close() {
    this._formSelector.reset();
    super.close();
  }
}
