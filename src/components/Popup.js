export default class Popup {
  constructor(popupSelector) {
      this._popupSelector = document.querySelector(popupSelector);
      this._openedClass = "popup_opened";
      this._handleClickClose = this._handleClickClose.bind(this);
      this._handleEscClose = this._handleEscClose.bind(this);

  }
  open() {
      this._popupSelector.classList.add(this._openedClass);

  }
  close() {
      this._popupSelector.classList.remove(this._openedClass);

  }
  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
          this.close();
      }
  }
  _handleClickClose(evt) {
      if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) {
          this.close();
      };
  }
  setEventListeners() {
      this._popupSelector.addEventListener('click', this._handleClickClose);
      document.addEventListener('keydown', this._handleEscClose);

  }
}