import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import {render, replace} from '../framework/render.js';

export default class PointPresenter {
  #point = null;
  #offers = [];
  #destinations = [];
  #tripEventListComponent = null;
  #pointEditComponent = null;
  #pointComponent = null;

  constructor ({tripEventListComponent}) {
    this.#tripEventListComponent = tripEventListComponent;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#pointComponent = new PointListView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
    });

    render (this.#pointComponent, this.#tripEventListComponent);
  }


  #escKeyDownHandler = (evt)=> {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };


  #replacePointToEditForm () {
    replace (this.#pointEditComponent, this.#pointComponent);
  }

  #replaceEditFormToPoint () {
    replace (this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click',this.#replaceEditFormToPoint);
  }

  #handleFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',this.#replaceEditFormToPoint);
  };

}

