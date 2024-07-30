import AbstractView from '../framework/view/abstract-view.js';
import { SortType, SORT_TYPE_DISABLED } from '../const.js';

function createSortListTemplate () {
  const sortItems = Object.values(SortType);
  return sortItems.map((sortItem, index) => {
    const isDisabled = SORT_TYPE_DISABLED.includes(sortItem) ? 'disabled' : '';
    const isChecked = index === 0 ? 'checked' : '';
    return `<div class="trip-sort__item  trip-sort__item--${sortItem}">
  <input id="sort-${sortItem}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem}" data-sort-type = "${sortItem}" ${isDisabled} ${isChecked}>
  <label class="trip-sort__btn" for="sort-${sortItem}">${sortItem}</label>
  </div>`;
  }).join('');

}

function createSortTemplate () {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createSortListTemplate ()}
</form>`
  );

}
export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor ({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }


  get template () {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };
}
