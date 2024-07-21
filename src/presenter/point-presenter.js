import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #point = null;
  #offers = [];
  #destinations = [];
  #tripEventListComponent = null;
  #pointEditComponent = null;
  #pointComponent = null;
  #handleDataChange = null;

  constructor ({tripEventListComponent, onDataChange}) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers, destinations) {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
    });

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: this.#handleEditClick,
      onFavoriteClick:this.#handleFavoriteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render (this.#pointComponent, this.#tripEventListComponent);
      return;
    }

    if (this.#tripEventListComponent.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#tripEventListComponent.contains(prevPointEditComponent.element)) {
      replace (this.#pointEditComponent, prevPointEditComponent);
    }

    remove (prevPointComponent);
    remove (prevPointEditComponent);
  }

  #destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };


  #replacePointToEditForm = () => {
    replace (this.#pointEditComponent, this.#pointComponent);
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click',this.#replaceEditFormToPoint);
  };

  #handleFormSubmit = () => {
    this.#replaceEditFormToPoint();
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',this.#replaceEditFormToPoint);
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
    this.#handleDataChange(updatedPoint, this.#offers, this.#destinations);
  };
}


