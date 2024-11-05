import {remove, render, RenderPosition} from '../framework/render.js';
import CreatePointView from '../view/create-point-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #onFormClose = null;

  #createPointComponent = null;

  constructor ({pointListContainer, onDataChange, onDestroy, onFormClose}) {

    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#onFormClose = onFormClose;
  }

  init (offers, destinations) {
    if (this.#createPointComponent !== null) {
      return;
    }
    this.#createPointComponent = new CreatePointView({
      offers: offers,
      destinations: destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render (this.#createPointComponent,this.#pointListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy () {
    if(this.#createPointComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#createPointComponent);
    this.#createPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#onFormClose();
  }


  setSaving() {
    this.#createPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }


  setAborting() {
    const resetFormState = () => {
      this.#createPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#createPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };


  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
