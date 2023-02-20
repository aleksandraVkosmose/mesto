export default class Card {
  constructor ({data, elementTemplate, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike, userId}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._elementTemplate = elementTemplate;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
  }
// Получаем шаблон карточки
  _getTemplate() {
    const cardElement  = document
    .querySelector(this._elementTemplate)
    .content
    .querySelector(".element")
    .cloneNode(true);
            
    return cardElement 
  }

  // Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

// Устанавливаем слушатели на карточку
  _setEventListeners() {
// открытие попапа просмотра изображения кликом по изображению
    this._elementImg.addEventListener('click', () => {
    this._handleCardClick(this._data);
    })
// слушатель кнопки удаления карточки
    this._elementDeleteButton.addEventListener('click', () => {
    this._handleDeleteIconClick(this._cardId);
    })
// слушатель кнопки лайк
      this._elementLikeButton.addEventListener('click', () => {
        if (this._elementLikeButton.classList.contains('element__button-like_is-active')) {
          this._handleRemoveLike(this._cardId);
        } else {
          this._handleSetLike(this._cardId);
        }
      })
    }
    // Проверка, стоит ли лайк на карточке
    _isCardLiked() {
      if (this._likes.some((user) => {
        return this._userId === user._id;
      })) {
        this._elementLikeButton.classList.add('element__button-like_is-active');
      }
    }
  
    // поставить/удалить лайк, изменение количества лайков
    handleLikeCard(data) {
      this._likes = data.likes;
      this._likesNumber.textContent = this._likes.length;
      this._elementLikeButton.classList.toggle('element__button-like_is-active');
    }
  
// проверяем владельца карточки и убираем кнопку Delete
  _isDeleteCard() {
    if (this._userId !== this._cardOwnerId) {
    this._elementDeleteButton.remove();
    }
  }

// Генерируем готовую карточку
  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.element__img');
    this._elementLikeButton = this._element.querySelector('.element__button-like');
    // this._likesCount = this._element.querySelector('.element__like-count');
    this._elementDeleteButton = this._element.querySelector('.element__button-delete');
     this._likesNumber = this._element.querySelector('.element__like-count');

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._isDeleteCard();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }
}

