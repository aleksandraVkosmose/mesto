export default class UserInfo {
constructor({nameSelector, jobSelector}){
    this._nameElement = nameSelector;
    this._jobElement = jobSelector;
}
//получение информации о пользователе
getUserInfo(){
  const profileInfo = {}
  profileInfo.name = this._nameElement.textContent;
  profileInfo.job = this._jobElement.textContent;

  return profileInfo;
  }
//установка информации о пользователе
  setUserInfo({name, job}){
  this._nameElement.textContent = name;
  this._jobElement.textContent = job;
}
}