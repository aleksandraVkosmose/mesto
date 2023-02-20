import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/Api.js";

import {
  initialCards,
  settings,
  buttonEdit,
  popupEditProfile,
  nameInput,
  aboutInput,
  profileTitle,
  profileSubtitle,
  buttonAdd,
  popupAddCard,
  formElementAdd,
  elements,
  avatar,
  avatarInput,
  buttonEditAvatar
} from "../utils/constants.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'f7e16f72-6fdb-4cb4-9e4c-1f17e80e3d75',
    'Content-Type': 'application/json',
  }
});

let userId; 

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((data) => {
    const [userData, initialCards] = data;
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })

// /* ------------------- Профиль юзера ------------------- */

  const userInfo = new UserInfo({
    nameSelector: profileTitle,
    aboutSelector: profileSubtitle,
    avatarSelector: avatar
  });

// создание попапа с формой редактирования профиля 
const popupWithEditForm = new PopupWithForm(".popup-edit", {
  submit: (data) => {
   // popupWithEditForm.renderLoading(true, 'Загрузка...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //popupWithEditForm.renderLoading(false);
        popupWithEditForm.close();
      })
  }
})

/*функция открытия попап Edit*/
buttonEdit.addEventListener('click', function() {
  popupWithEditForm.open()
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  popupEditProfileValidator.resetValidation();
});

popupWithEditForm.setEventListeners();

// Создание попапа редактирования аватара пользователя
const popupAvatarForm = new PopupWithForm(".popup-avatar", {
  submit: (data) => {
   // popupWithAvatarForm.renderLoading(true, 'Загрузка...');
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarForm.close();
      })
  }
})
buttonEditAvatar.addEventListener('click', function () {
  popupAvatarForm.open()
})
popupAvatarForm.setEventListeners();

// /* ----------- Карточки с изображениями ----------- */

// функционал создания новой карточки
const createElement = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    elementTemplate: '#element',
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
      deleteCardPopup.open();
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
  })

  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса Section
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createElement(card), "append");
  }
}, elements)

const popupWithAddForm = new PopupWithForm(".popup-add", {
  submit: (data) => {
    //popupWithAddForm.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const cardElement = createElement(res)
        cardsList.addItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        //popupWithAddForm.renderLoading(false);
        popupWithAddForm.close()
      })
  }
})
popupWithAddForm.setEventListeners();

const deleteCardPopup = new PopupWithSubmit({
  popupSelector: ".popup-confirm"
})
deleteCardPopup.setEventListeners();

/*функция открытия попап Add*/
buttonAdd.addEventListener('click', function () {
  formElementAdd.reset();
  popupWithAddForm.open();
  popupAddCardValidator.resetValidation();
});

/* попап просмотра фото */
const photoPopup = new PopupWithImage('.popup_photo-card');
photoPopup.setEventListeners();

/* Валидация форм */
const popupEditProfileValidator = new FormValidator(settings, popupEditProfile);
popupEditProfileValidator.enableValidation();

const popupAddCardValidator = new FormValidator(settings, popupAddCard);
popupAddCardValidator.enableValidation();