export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._openedClass = "popup_opened";
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);

    }
    open() {
        this._popup.classList.add(this._openedClass);
        document.addEventListener('keydown', this._handleEscClose);

    }
    close() {
        this._popup.classList.remove(this._openedClass);
        document.removeEventListener('keydown', this._handleEscClose);
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
        this._popup.addEventListener('click', this._handleClickClose);


    }
}