export default class Popup{
  constructor(popupSelector){
      this._popup = document.querySelector(popupSelector);
    //   this._handleEscClose = this._handleEscClose.bind(this);
  }

  open(){
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners(){
    this._popup.addEventListener('click', (evt) => { 
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) { 
      this.close(); 
      }; 
    });
  }
}