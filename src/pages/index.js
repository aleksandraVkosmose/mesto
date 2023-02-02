import Section from "../components/Section.js"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import './index.css';
import {
  initialCards,
  settings,
  buttonEdit,
  popupEditProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
  buttonAdd,
  popupAddCard,
  formElementAdd,
  elements,
  elementTemplate
} from "../utils/constants.js";



const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
const popupAddCardValidator = new FormValidator(settings, popupAddCard);


const photoPopup = new PopupWithImage('.popup_photo-card');
photoPopup.setEventListeners();

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
  popupWithEditForm.open()
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupEditProfileValidator.resetValidation();
});

popupWithEditForm.setEventListeners()

const popupAdd = new PopupWithForm(".popup-add", submitAddCardForm);

/* функция заполнения попап add */
function createElement(item) {
  const card = new Card(item, "#element", handlePreviewImg);
  const cardElement = card.generateCard();
  return cardElement;

function handlePreviewImg(name, link) {
  photoPopup.open(name, link);
  }
}

/*функция открытия попап Add*/
buttonAdd.addEventListener('click', function(){
  formElementAdd.reset();
  popupAdd.open()
  popupAddCardValidator.resetValidation();
  });

const cardsList = new Section({
  data: initialCards,
  renderer: (item) => {
  const element = createElement(item)
  cardsList.addItem(element);
  }
}, elements)
cardsList.renderItems();

function submitAddCardForm(values) {
  cardsList.addItem(createElement(values));
  popupAdd.close();
}

popupAdd.setEventListeners();

popupEditProfileValidator.enableValidation();
popupAddCardValidator.enableValidation();