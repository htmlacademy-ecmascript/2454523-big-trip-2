import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
//import CreatePointView from '../view/create-point-view.js'; //импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import {render,RenderPosition} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortPriceDown, sortTimeDurationDown, sortDateFromUp } from '../utils/point.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;

  #tripEventComponent = new TripEventView();
  #tripEventListComponent = new TripEventListView();
  #noPointComponent = new NoPointView();
  #sortComponent = null;
  #pointPresenters = new Map();

  #boardPoints = [];
  #offers = [];
  #destinations = [];
  #currentSortType = SortType.DAY;

  constructor ({tripEventsContainer,pointsModel}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
  }

  init () {
    this.#boardPoints = [... this.#pointsModel.points];
    this.#offers = [... this.#pointsModel.offers];
    this.#destinations = [... this.#pointsModel.destinations];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatePoint,offers,destinations) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatePoint);
    this.#pointPresenters.get(updatePoint.uniqId).init(updatePoint, offers, destinations);

  };

  #sortPoint(sortType) {
    switch(sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortPriceDown);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortTimeDurationDown);
        break;
      default:
        this.#boardPoints.sort(sortDateFromUp);
    }
    this.#currentSortType = sortType;
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoint(sortType);
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
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.uniqId, pointPresenter);
  }

  #renderPointList () {
    render(this.#tripEventListComponent,this.#tripEventComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#offers, this.#destinations);
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

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    //render (new CreatePointView({point: this.#boardPoints[0]}, {offers: this.#offers}, {destinations: this.#destinations}), this.#tripEventListComponent.element); //- отрисовка формы созадния

  }

}
