import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._image = document.querySelector('.popup__img-card');
      this._title = document.querySelector('.popup__title-card');
    }
open(name, link){
    this._image.src = link;
    this._title.alt = name;
    this._title.textContent = name;
    super.open();
}

}