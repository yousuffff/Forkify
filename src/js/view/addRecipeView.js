import View from "./View";
import previewView from "./previewView";
// import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe added successfully'
  _btnOpen = document.querySelector('.nav__btn--add-recipe')
  _btnClose = document.querySelector('.btn--close-modal')
  _overlay = document.querySelector('.overlay')
  _recipeWindow = document.querySelector('.add-recipe-window')

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._recipeWindow.classList.toggle('hidden');

  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }
  _addHandlerCloseWindow() {
    this._overlay.addEventListener('click', this.toggleWindow.bind(this))
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    // this._parentElement.addEventListener('submit', this.toggleWindow.bind(this));
  }

  addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; // convert form data into array
      const Data = Object.fromEntries(dataArr) // convert array data into object
      handler(Data);
    })

  }
  _generateMarkUp() {
  }

}
export default new AddRecipeView();