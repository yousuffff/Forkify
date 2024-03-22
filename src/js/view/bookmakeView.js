import View from "./View";
import previewView from "./previewView";
// import icons from 'url:../../img/icons.svg';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmark yet!! Find some nice recipes and bookmark them. ;)`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler)
  }
  _generateMarkUp() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }

}
export default new bookmarkView();