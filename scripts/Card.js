 export default class Card {
    constructor (data, templateSelector, handlePreviewImg) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handlePreviewImg = handlePreviewImg;
      
    }
    _getTemplate(){
      const cardElement = document
      .querySelector("#element")
      .content
      .querySelector(".element")
      .cloneNode(true);
              
      return cardElement //dom- элемент карточки (у нас было elementClone)
    }
    generateCard(){
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__img').src = this._link;
      this._element.querySelector('.element__img').alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
  
      return this._element;
    }
     _setEventListeners(){
      const elementDeleteButton = this._element.querySelector('.element__button-delete');
      elementDeleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick()
      });
  
      const elementLikeButton = this._element.querySelector('.element__button-like');
      elementLikeButton.addEventListener('click', () => {
        this._handleLikeButtonClick()
      });
      const elementImg = this._element.querySelector('.element__img');
      elementImg.addEventListener('click', () => {
        this._handlePreviewImg();
      });
  
  }
      _handleLikeButtonClick = () => {
        this._element.querySelector('.element__button-like').classList.toggle('element__button-like_is-active')
      }
      
      _handleDeleteButtonClick = () => {
        this._element.remove()
      }
    }
  
  

  