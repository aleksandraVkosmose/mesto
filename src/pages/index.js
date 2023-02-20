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
  buttonEditAvatar,
  popupAvatar
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
    popupWithEditForm.renderLoading(true, 'Загрузка...');
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithEditForm.renderLoading(false);

      })
  }
})

/*функция открытия попап Edit*/
buttonEdit.addEventListener('click', function () {
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
    popupAvatarForm.renderLoading(true, 'Загрузка...');
    api.editAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatarForm.renderLoading(false);

      })
  }
})
buttonEditAvatar.addEventListener('click', function () {
  popupAvatarFormValidator.resetValidation();
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
      deleteCardPopup.setSubmitCallback(() => {
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
    popupWithAddForm.renderLoading(true);
    api.postCard(data)
      .then((res) => {
        const cardElement = createElement(res)
        cardsList.addItem(cardElement);
        popupWithAddForm.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithAddForm.renderLoading(false);

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

const popupAvatarFormValidator = new FormValidator(settings, popupAvatar);
popupAvatarFormValidator.enableValidation();