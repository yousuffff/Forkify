import * as model from './model.js'
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import PaginationView from './view/paginationView.js';
import bookmakeView from './view/bookmakeView.js';
import addRecipeView from './view/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './view/paginationView.js';



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const apiKey = 'ef95360f-e959-481e-abcb-c11494d8bced';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id)
    if (!id) return; // guard clause
    recipeView.renderSpinner();
    // 0 Updating search result selected 

    resultView.update(model.getSearchResultsPerPage());
    bookmakeView.update(model.state.bookmarks)

    //1 loading recipe
    await model.loadingRecipe(id);

    //2 rendering recipe
    recipeView.render(model.state.recipe)
  } catch (err) {
    // console.error(err);
    recipeView.renderError();
  }
};
const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultView.renderSpinner()
    // console.log(query);
    await model.loadSearchRecipe(query)
    // console.log(model.state.search.result);
    resultView.render(model.getSearchResultsPerPage())
    PaginationView.render(model.state.search)
  } catch (err) {
    console.log(err)
  }
}
const controlPaginationClick = function (goToPage) {
  resultView.render(model.getSearchResultsPerPage(goToPage))
  PaginationView.render(model.state.search)

}
const controlServings = function (newServings) {

  model.updateServings(newServings);
  recipeView.update(model.state.recipe)

}
const controlAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // console.log(model.state.recipe);
  // render update view
  recipeView.update(model.state.recipe)

  //render update bookmark view
  bookmakeView.render(model.state.bookmarks)
}
const controlBookmark = function () {
  bookmakeView.render(model.state.bookmarks)
}
const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe)
    addRecipeView.renderSpinner()
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe)
    recipeView.render(model.state.recipe);
    bookmakeView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    addRecipeView.renderMessage();
    setTimeout(function () {
      addRecipeView.toggleWindow()
    }, 1500)
  } catch (err) {
    addRecipeView.renderError(err.message);
    // console.log(err)
  }

}
// publisher-subscriber model
const init = function () {
  addRecipeView.addHandlerUploadRecipe(controlAddRecipe)
  bookmakeView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServing(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPaginationClick);
}
init();

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);


