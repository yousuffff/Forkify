import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');



  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if(!btn) return;
      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      // console.log(btn)
      handler(goToPage)
    })
  }

  _generateMarkUp() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    // const numOfPages = 5;
    // console.log(numOfPages);

    //1 if there is more than one page
    if (curPage === 1 && numOfPages > 1) {
      return `
          <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    //2 last page
    if (curPage === numOfPages && numOfPages > 1) {
      return `
          <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button> 
      `;
    }
    //3 middle page
    if (curPage < numOfPages) {
      return `
          <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button> 

          <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    //4 only one page
    return '';
  }
}
export default new PaginationView();
