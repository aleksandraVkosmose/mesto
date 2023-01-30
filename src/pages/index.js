import Section from "../components/Section.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Popup from "../components/Popup.js";
import { initialCards } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}; 

/*переменные для попап Edit*/
const buttonEdit = document.querySelector(".profile__button-edit");
const popupEditProfile = document.querySelector(".popup-edit");
const buttonCloseEdit = document.querySelector(".popup__button-close-edit");
const popupContainer = document.querySelector('.popup');

const formElementEdit = document.forms["edit-from"];
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
const formElementAdd = document.forms["add-from"];

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

const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupAddCardValidator = new FormValidator(settings, popupAddCard);

const popupEdit = new Popup(".popup-edit");
const popupAdd = new Popup(".popup-add");
const photoPopup = new PopupWithImage('.popup_photo-card');

/*функция открытия попап Add*/
buttonAdd.addEventListener('click', function(){
  formElementAdd.reset();
  popupAdd.open()
  popupAddCardValidator.resetValidation();
  });

/*функция открытия для попап фото*/
elementTemplate.addEventListener('click', function(){
  photoPopup.open()
});

const popupWithEditForm = new PopupWithForm(".popup-edit", submitEditProfileForm);

const userInfo = new UserInfo ({
  nameSelector: profileTitle,
  jobSelector: profileSubtitle
});

/* функция заполнения попап edit */  
function submitEditProfileForm(value){
  userInfo.setUserInfo(value);
  popupWithEditForm.close();
}

/*функция открытия попап Edit*/
buttonEdit.addEventListener('click', function(){
  popupEdit.open()
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfileValidator.resetValidation();
});

popupWithEditForm.setEventListeners()

/* функция заполнения попап add */
function createElement(item) {
  const card = new Card(item, "#element", handlePreviewImg);
  const cardElement = card.generateCard();
  return cardElement;

function handlePreviewImg(name, link) {
  photoPopup.open(name, link);
  }
}

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
  const element = createElement(item)
  cardsList.addItem(element);
  }
}, elements)
cardsList.renderItems();

const submitAddCardForm = (evt) => {
  
  evt.preventDefault()
  

//здесь мы сами создаем объект, который будем передавать в cardElement
  const cardElement = {
    name: formName.value,
    link: formLink.value
  }

  const element = createElement(cardElement);
  elements.prepend(element);
  popupAdd.close();
}

formElementAdd.addEventListener('submit', submitAddCardForm );

popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();

