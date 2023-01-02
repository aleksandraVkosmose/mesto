import Card from "./Card.js";
import FormValidator from "./validate.js"
/*переменные для попап Edit*/
const buttonEdit = document.querySelector(".profile__button-edit");
const popupEditProfile = document.querySelector(".popup-edit");
const buttonCloseEdit = document.querySelector(".popup__button-close-edit");
const popupContainer = document.querySelector('.popup');

const formElementEdit = document.querySelector(".popup__form-edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

/*переменные для попап Add*/
const buttonAdd = document.querySelector(".profile__button-add");
const popupAddCard = document.querySelector(".popup-add");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const buttonCloseAdd = document.querySelector(".popup__button-close-add");
const formElementAdd = document.querySelector(".popup__form-add");

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content.querySelector('.element');
const formName = document.querySelector('[name="place-name"]');
const formLink = document.querySelector('[name="link-place"]');

/* переменные для попап фото */
const popupCardPhoto = document.querySelector('.popup_photo-card');
const pupupContainerCard = document.querySelector('popup__container-card');
const popupImageCard = document.querySelector('.popup__img-card');
const popupTitleCard = document.querySelector('.popup__title-card');
const popupButtonClosePhoto = document.querySelector(".popup__button-close-photo");

const submitButtonSelector = document.querySelector(".popup__button-save");
const inactiveButtonClass = document.querySelector(".popup__button-save_disabled");

const elementDeleteButton = document.querySelector('.element__button-delete');
const elementLikeButton = document.querySelector('.element__button-like');

/*функция закрытия попап ESC*/
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

/*функция закрытия попапов кликом вне попап и крестиком*/
document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) { 
      closePopup(popup); 
    }; 
  }); 
}); 

/*функция открытия попап*/
const openPopup = function (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

/*функция закрытия попап*/
const closePopup = function (popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

/*функция открытия попап Edit*/
buttonEdit.addEventListener('click', function(){
  openPopup(popupEditProfile)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

/*функция открытия для попап фото*/
popupImageCard.addEventListener('click', function(){
  openPopup(popupCardPhoto)
});

/*функция открытия попап Add*/
buttonAdd.addEventListener('click', function(){
  openPopup(popupAddCard) 
  });

/* функция заполнения попап edit */
formElementEdit.addEventListener('submit', submitEditProfileForm);

function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile)
};
/* функция заполнения попап add */
function createElement(item) {
  const card = new Card(item, "#element", handlePreviewImg);
  const cardElement = card.generateCard();
  return cardElement;

function handlePreviewImg() {
  popupImageCard.src = this._link;
  popupImageCard.alt = this._name;
  popupTitleCard.textContent = this._name;
  openPopup(popupCardPhoto);
  }
}

const renderElementClone = (item, elements) => {
    const element = createElement(item)
    elements.prepend(element);
}

initialCards.forEach(function(item) {
    renderElementClone(item, elements)
})

const submitAddCardForm = (e) => {
  e.preventDefault()

//здесь мы сами создаем объект, который будем передавать в cardElement
  const cardElement = {
    name: formName.value,
    link: formLink.value
  }

  e.target.reset();
  disableButton(e.submitter, settings)
  renderElementClone(cardElement, elements)
  closePopup(popupAddCard);
  
}

formElementAdd.addEventListener('submit', submitAddCardForm );

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupAddCardValidator = new FormValidator(settings, popupAddCard);


popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();


const disableButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__button-save_disabled');
}