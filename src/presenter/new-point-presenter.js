import {remove, render, RenderPosition} from '../framework/render.js';
import CreatePointView from '../view/create-point-view.js';
import { nanoid } from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  //#point = null;
  // #offers = [];
  // #destinations = [];
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #createPointComponent = null;

  constructor ({pointListContainer, onDataChange, onDestroy}) {

    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init (offers, destinations) {
    if (this.#createPointComponent !== null) {
      return;
    }
    this.#createPointComponent = new CreatePointView({
      //point: this.#point,
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
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
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
