export default class Section {
  constructor ({data, renderer}, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }
//публичный метод, отвечвющий за отрисовку карточек
  renderItems() {
    this._initialArray.forEach((item) => {
        this._renderer(item);
    });
  }
//публичный метод, применяет DOM-элемент и добавляет его в контейнер elements
  addItem(item){
    this._container.prepend(item);
  }
}