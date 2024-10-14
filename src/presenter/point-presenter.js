import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import { isDateFromEqual,isDurationsEqual,isPriceEqual } from '../utils/point.js';

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
      onDeleteClick: this.#handleDeleteClick
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
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;

    }

    remove (prevPointComponent);
    remove (prevPointEditComponent);
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleEnterKey = (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
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
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('keydown', this.#handleEnterKey);
    this.#mode = Mode.DEFAULT;
  };


  #handleFormSubmit = (update) => {

    const isMinorUpdate = !isDateFromEqual(this.#point.dateFrom, update.dateFrom) ||
    !isDurationsEqual(this.#point,update) || !isPriceEqual(this.#point.basePrice, update.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update);
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',this.#replaceEditFormToPoint);
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').focus();
    this.#pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('keydown', this.#handleEnterKey);
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    };
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      updatedPoint);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}


