import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-section-view.js';
//import CreatePointView from '../view/create-point-view.js'; //импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render, replace,RenderPosition} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEventsComponent = new TripEventView();
  #tripEventListComponent = new TripEventListView();
  #noPointComponent = new NoPointView();
  #sortComponent = new SortView();

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

  #renderSort () {
    render(this.#sortComponent, this.#tripEventsComponent.element, RenderPosition.AFTERBEGIN);
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

  #renderPointList () {
    render(this.#tripEventListComponent,this.#tripEventsComponent.element);
    for (let i = 1; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#offers, this.#destinations);
    }
  }


  #renderNoPoints () {
    render(this.#noPointComponent,this.#tripEventsComponent.element,RenderPosition.AFTERBEGIN);
  }

  #renderBoard () {
    render(this.#tripEventsComponent, this.#tripEventsContainer);

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    //render (new CreatePointView({point: this.#boardPoints[0]}, {offers: this.#offers}, {destinations: this.#destinations}), this.#tripEventListComponent.element); //- отрисовка формы созадния

  }

}
