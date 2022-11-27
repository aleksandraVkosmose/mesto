/*попап Edit*/
const buttonEdit = document.querySelector(".profile__button-edit");
const popupEdit = document.querySelector(".popup-edit");
const buttonCloseEdit = document.querySelector(".popup__button-close-edit");

const formElementEdit = document.querySelector(".popup__content-edit");
const nameInput = document.querySelector(".popup__form_type_name");
const jobInput = document.querySelector(".popup__form_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

/*попап Add*/
const buttonAdd = document.querySelector(".profile__button-add");
const popupAdd = document.querySelector(".popup-add");
const placeInput = document.querySelector(".popup__form_type_place");
const linkInput = document.querySelector(".popup__form_type_link");
const buttonCloseAdd = document.querySelector(".popup__button-close-add");
const formElementAdd = document.querySelector(".popup__content-add");

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content.querySelector('.element');
const formInput = document.querySelector('[name="place-name"]');
const formLink = document.querySelector('[name="link-place"]');

/* переменные для попап фото */
const popupCardPhoto = document.querySelector('.popup_photo-card');
const pupuContainerCard = document.querySelector('popup__container-card');
const popupImageCard = document.querySelector('.popup__img-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const popupButtonClosePhoto = document.querySelector(".popup__button-close-photo");

/*функция открытия попап Edit*/
buttonEdit.addEventListener('click', openPopupEdit);
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

/*функция закрытия попап Edit*/
buttonCloseEdit.addEventListener('click', closePopupEdit);
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
};


/* функция заполнения попап edit */
formElementEdit.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopupEdit();
};

/*функция открытия попап Add*/

buttonAdd.addEventListener('click', openPopupAdd);
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');

};

/*функция закрытия попап Add*/

buttonCloseAdd.addEventListener('click', closePopupAdd);
function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
};
/* функция заполнения попап add */
formElementAdd.addEventListener('submit', formSubmitHandler1);

function formSubmitHandler1(evt) {
  evt.preventDefault();

  closePopupAdd();
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function createElement(card) {

const elementClone = elementTemplate.cloneNode(true);
const elementImg = elementClone.querySelector('.element__img');
const elementTitle = elementClone.querySelector('.element__title');
const elementDeleteButton = elementClone.querySelector('.element__button-delete');
const elementLikeButton = elementClone.querySelector('.element__button-like');

elementImg.src = card.link;
elementTitle.textContent = card.name


function handlePreviewImg() {
  popupImageCard.src = elementImg.src;
  popupImageCard.alt = elementTitle.textContent;
  popupTitleCard.textContent = elementTitle.textContent;
  openPopupPhoto();
  
}

// Обработчики кликов для кнопок лайка и удаления
elementDeleteButton.addEventListener('click', handleDeleteButtonClick)
elementLikeButton.addEventListener('click', handleLikeButtonClick)
elementImg.addEventListener('click', handlePreviewImg);

return elementClone;
}

const handleLikeButtonClick = (e) => {
  e.target.classList.toggle('element__button-like_is-active')
}

const handleDeleteButtonClick = (e) => {
  e.target.closest('.element').remove()
}

// Функция делает две вещи - создает элемент (вызывая createElement) и добавляет его на страницу
// card - объект с данными elementClone
// elements - элемент, в который добавится наш новый elementClone
const renderElementClone = (card, elements) => {
    const element = createElement(card)
    elements.prepend(element);
}

initialCards.forEach(function(card) {
    renderElementClone(card, elements)
})


const handleFormSubmit = (e) => {
  e.preventDefault()

// здесь мы сами создаем объект, который будем передавать в elementClone
  const elementClone = {
    name: formInput.value,
    link: formLink.value
  }
  formInput.value = '',
  formLink.value = ''

  renderElementClone(elementClone, elements)
}

formElementAdd.addEventListener('submit', handleFormSubmit )

/*функция открытия для попап фото*/

function openPopupPhoto() {
  
  popupCardPhoto.classList.add('popup_opened');
  
};


popupButtonClosePhoto.addEventListener('click', closePopupPhoto);
function closePopupPhoto() {
  popupCardPhoto.classList.remove('popup_opened');
  
};
