import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-section-view.js';
//import CreatePointView from '../view/create-point-view.js'; //импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render, replace} from '../framework/render.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEventsComponent = new TripEventView();
  #tripEventListComponent = new TripEventListView();

  constructor ({tripEventsContainer,pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  #boardPoints = [];
  #offers = [];
  #destinations = [];

  init () {
    this.#boardPoints = [... this.#pointsModel.points];
    this.#offers = [... this.#pointsModel.offers];
    this.#destinations = [... this.#pointsModel.destinations];
    this.#renderBoard();
  }

  #renderPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt)=> {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
      }
    };

    const pointEditComponent = new EditPointView({point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEditFormToPoint();
      }});

    const pointComponent = new PointListView({point,
      offers,
      destinations,
      onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
        pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click',replaceEditFormToPoint);
      }});

    function replacePointToEditForm () {
      replace (pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace (pointComponent, pointEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
      pointEditComponent.element.querySelector('.event__rollup-btn').removeEventListener('click',replaceEditFormToPoint);
    }

    render (pointComponent, this.#tripEventListComponent.element);
  }

  #renderBoard () {
    render(this.#tripEventsComponent, this.#tripEventsContainer);
    render(new SortView(), this.#tripEventsComponent.element);
    render(this.#tripEventListComponent,this.#tripEventsComponent.element);
    //render (new CreatePointView({point: this.#boardPoints[0]}, {offers: this.#offers}, {destinations: this.#destinations}), this.#tripEventListComponent.element); //- отрисовка формы созадния

    for (let i = 1; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#offers, this.#destinations);
    }
  }

}
