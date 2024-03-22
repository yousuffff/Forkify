import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, KEY } from "./config";
// import { getJSON, sendJSON } from "./helper";
import { AJAX } from "./helper";
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
}
const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    image_url: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cooking_time: recipe.cooking_time,
    source_url: recipe.source_url,
    ...(recipe.key && { key: recipe.key })
  };
}
export const loadingRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data)

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

  } catch (err) {
    throw err;
  }
}
export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
    console.log(data);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image_url: rec.image_url,
        publisher: rec.publisher,
        ...(rec.key && { key: rec.key })

      }
    })
    state.search.page = 1;
  } catch (err) {
    console.log(err)
    throw err;
  }
};
export const getSearchResultsPerPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;// 0;
  const end = page * state.search.resultsPerPage // 10;

  return state.search.result.slice(start, end)
}
export const updateServings = function (newServings) {
  // console.log(state.recipe)
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  })
  // console.log(state.recipe.ingredients)
  state.recipe.servings = newServings;
}
const presistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
export const addBookmark = function (recipe) {

  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presistBookmark();
}
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presistBookmark();
}


// if we didn't do this then we get undefined in bookmark if there is no bookmark. 
const init = function () {
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
}
init()

export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe)
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
      // const ingArr = ing[1].replaceAll(' ', '').split(',');
      const ingArr = ing[1].split(',').map(el => el.trim());
      // console.log(ingArr)

      if (ingArr.length !== 3) throw new Error('Worng Ingredient Format!! Please use the correct format :)')

      const [quantity, unit, description] = ingArr;

      return { quantity: quantity ? +quantity : null, unit, description }
    })
    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
    }
    console.log(recipe)
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe)
    state.recipe = createRecipeObject(data)
    addBookmark(state.recipe)
    // console.log(ingredients);
  }
  catch (err) {
    throw err;
  }

}