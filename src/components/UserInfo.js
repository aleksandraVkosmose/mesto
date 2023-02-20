export default class UserInfo {
  constructor({nameSelector, aboutSelector}){
      this._nameElement = nameSelector;
      this._aboutElement = aboutSelector;
      this._avatarElement = document.querySelector(".profile__avatar")
  }
  
  getUserInfo(){
    const data = {
    name: this._nameElement.textContent,
    about: this._aboutElement.textContent,
    avatar: this._avatarElement.src
    }
    return data;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
  
  setUserInfo(data){
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
       this.setUserAvatar(data);
    //  this._avatarElement.alt = `${data.name} avatar`;
  }
}