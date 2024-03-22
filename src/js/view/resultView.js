import View from "./View";
import previewView from "./previewView";

class resultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Sorry!! Couldn't find the recipe. Please try another One`
  _message = ``;

  _generateMarkUp() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }

}
export default new resultView();
