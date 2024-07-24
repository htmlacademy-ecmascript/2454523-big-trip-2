import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};
export default class PointPresenter {
  #point = null;
  #offers = [];
  #destinations = [];
  #tripEventListComponent = null;
  #pointEditComponent = null;
  #pointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor ({tripEventListComponent, onDataChange, onModeChange}) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove (prevPointComponent);
    remove (prevPointEditComponent);
  }

  #destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };


  #replacePointToEditForm = () => {
    replace (this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click',this.#replaceEditFormToPoint);
    this.#mode = Mode.DEFAULT;
  };

  #handleFormSubmit = (point,offers,destinations) => {
    this.#handleDataChange(point,offers,destinations);
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


