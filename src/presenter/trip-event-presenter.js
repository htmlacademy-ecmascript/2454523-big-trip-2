import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-section-view.js';
import CreatePointView from '../view/create-point-view.js'; //импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../framework/render.js';

export default class TripEventPresenter {
  tripEventsComponent = new TripEventView();
  tripEventListComponent = new TripEventListView();

  constructor ({tripEventsContainer,pointsModel}) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
  }

  init () {
    this.boardPoints = [... this.pointsModel.getPoints()];
    this.offers = [... this.pointsModel.getOffers()];
    this.destinations = [... this.pointsModel.getDestinations()];
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new SortView(), this.tripEventsComponent.element);
    render(this.tripEventListComponent,this.tripEventsComponent.element);
    render (new EditPointView({point: this.boardPoints[0]}, {offers: this.offers}, {destinations: this.destinations}), this.tripEventListComponent.element);
    render (new CreatePointView({point: this.boardPoints[0]}, {offers: this.offers}, {destinations: this.destinations}), this.tripEventListComponent.element); //- отрисовка формы созадния

    for (let i = 1; i < this.boardPoints.length; i++) {
      render (new PointListView({point: this.boardPoints[i]},{offers: this.offers}, {destinations: this.destinations}), this.tripEventListComponent.element);
    }

  }
}

