export default class Section {
  constructor({renderer}, elements) {
    //this._initialArray = data;
    this._container = elements;
    this._renderer = renderer; 
  }
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

addItem(item, place = 'prepend') {
  if (place === 'append') {
    this._container.append(item);
  } else {
    this._container.prepend(item);
  }
}
}