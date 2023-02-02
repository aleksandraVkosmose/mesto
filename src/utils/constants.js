 export const initialCards = [
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
  export const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }; 
  
  /*переменные для попап Edit*/
  export const buttonEdit = document.querySelector(".profile__button-edit");
  export const popupEditProfile = document.querySelector(".popup-edit");
  
  export const nameInput = document.querySelector(".popup__input_type_name");
  export const jobInput = document.querySelector(".popup__input_type_job");
  export const profileTitle = document.querySelector(".profile__title");
  export const profileSubtitle = document.querySelector(".profile__subtitle");
  
  /*переменные для попап Add*/
  export const buttonAdd = document.querySelector(".profile__button-add");
  export const popupAddCard = document.querySelector(".popup-add");
  export const formElementAdd = document.forms["add-from"];
  
  export const elements = document.querySelector('.elements');
  export const elementTemplate = document.querySelector('#element').content.querySelector('.element');
  export const formName = document.querySelector('[name="place-name"]');
  export const formLink = document.querySelector('[name="link-place"]');
