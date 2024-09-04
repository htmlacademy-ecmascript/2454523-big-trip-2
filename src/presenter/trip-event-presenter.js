import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
//import CreatePointView from '../view/create-point-view.js'; //импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import {render,RenderPosition} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UserAction, UpdateType } from '../const.js';
import { sortPriceDown, sortTimeDurationDown, sortDateFromUp } from '../utils/point.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripEventComponent = new TripEventView();
  #tripEventListComponent = new TripEventListView();
  #noPointComponent = new NoPointView();
  #sortComponent = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor ({tripEventsContainer,pointsModel, destinationsModel, offersModel }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch(this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPriceDown);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTimeDurationDown);
    }
    return [...this.#pointsModel.points].sort(sortDateFromUp);
  }

  init () {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handlePointChange = (updatePoint,offers,destinations) => {
  //   this.#pointPresenters.get(updatePoint.uniqId).init(updatePoint, offers, destinations);

  // };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }

  };

  #handleModelEvent = (updateType, data) => {
    // - обновить часть списка (например, когда поменялось описание)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.uniqId).init(data, this.#offersModel.offers, this.#destinationsModel.destinations);
        break;
      case UpdateType.MINOR:
        // - обновить список
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort () {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      tripEventListComponent: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.uniqId, pointPresenter);
  }

  #renderPointList () {
    render(this.#tripEventListComponent,this.#tripEventComponent.element);
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#offersModel.offers, this.#destinationsModel.destinations);
    }
  }

  #clearPointList () {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }


  #renderNoPoints () {
    render(this.#noPointComponent,this.#tripEventComponent.element,RenderPosition.AFTERBEGIN);
  }

  #renderBoard () {
    render(this.#tripEventComponent, this.#tripEventsContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    //render (new CreatePointView({point: this.#boardPoints[0], offers: this.#offers, destinations: this.#destinations}), this.#tripEventListComponent.element); //- отрисовка формы созадния

  }

}
