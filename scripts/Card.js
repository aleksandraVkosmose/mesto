 export default class Card {
    constructor (data, elementTemplate, handlePreviewImg) {
      this._name = data.name;
      this._link = data.link;
      this._elementTemplate = elementTemplate;
      this._handlePreviewImg = handlePreviewImg;
      
    }
    _getTemplate(){
      const cardElement = document
      .querySelector(this._elementTemplate)
      .content
      .querySelector(".element")
      .cloneNode(true);
              
      return cardElement 
    }
    generateCard(){
      this._element = this._getTemplate();
      this._elementImg = this._element.querySelector('.element__img');
      this._elementLikeButton = this._element.querySelector('.element__button-like');
      this._setEventListeners();
      this._elementImg.src = this._link;
      this._elementImg.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
  
      return this._element;
    }
     _setEventListeners(){
      const elementDeleteButton = this._element.querySelector('.element__button-delete');
      elementDeleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick()
      });
  
      this._elementLikeButton.addEventListener('click', () => {
        this._handleLikeButtonClick()
      });
      this._elementImg.addEventListener('click', () => {
        this._handlePreviewImg(this._name, this._link);
      });
  
  }
      _handleLikeButtonClick = () => {
        this._elementLikeButton.classList.toggle('element__button-like_is-active')
      }
      
      _handleDeleteButtonClick = () => {
        this._element.remove()
      }
    }
  
  

  