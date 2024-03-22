import icons from 'url:../../img/icons.svg';

export default class View {

  _data;

  render(data, render = true) {
    if (!data || Array.isArray(data) && data.length === 0) return this.renderError();

    this._data = data;
    const markUp = this._generateMarkUp();
    if (!render) return markUp;
    this.renderSpinner();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  update(data) {
    this._data = data;
    // if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
    const newMarkup = this._generateMarkUp();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));;

    newElement.forEach(function (newEl, i) {
      const curEl = curElement[i];
      //Updating value 
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }
      // updating Attribute 
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attri => {
          curEl.setAttribute(attri.name, attri.value);
        })
      }
    })
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markUp = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  };
  renderError(message = this._errorMessage) {
    const markUp = `
       <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
          <p>${message}</p>
       </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._message) {
    const markUp = `
       <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
          <p>${message}</p>
       </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}