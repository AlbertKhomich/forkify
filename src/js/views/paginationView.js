import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // we are on a page 1 and there are another pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'next');
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'prev');
    }

    // other page
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupButton(currentPage, 'next')}
        ${this._generateMarkupButton(currentPage, 'prev')}
        `;
    }

    // we are on a page 1 and there aren't another pages
    return '';
  }

  _generateMarkupButton(currentPage, action) {
    if (action === 'prev') {
      return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }

    if (action === 'next') {
      return `
        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
  }
}

export default new paginationView();
