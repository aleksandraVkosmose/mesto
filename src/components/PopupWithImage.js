import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
constructor(popupSelector){
    super (popupSelector);
    this._popupImageCard = document.querySelector('.popup__img-card');
    this._popupTitleCard = document.querySelector('.popup__title-card');
}
open({name, link}){
    this._popupImageCard.src = link;
    this._popupImageCard.alt = name;
    this._popupTitleCard.textContent = name;
    super.open();
}
} 