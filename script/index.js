let buttonEdit = document.querySelector(".profile__button-edit");
let popup = document.querySelector(".popup");
let container = popup.querySelector(".popup__container");
let buttonClose = document.querySelector(".popup__button-close");

buttonEdit.addEventListener('click', openPopup);
function openPopup(){
    popup.classList.add('popup_opened');
};

buttonClose.addEventListener('click', closePopup);
function closePopup(){
  popup.classList.remove('popup_opened');
};

let formElement = document.querySelector(".popup__content");
let nameInput = document.querySelector(".popup__title");
let jobInput = document.querySelector(".popup__subtitle");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler (evt) {
  evt.preventDefault();
   profileTitle.textContent = nameInput.value;
   profileSubtitle.textContent = jobInput.value;
   
   

   closePopup();
   
};
   
nameInput.value = profileTitle.textContent;
   jobInput.value = profileSubtitle.textContent;

