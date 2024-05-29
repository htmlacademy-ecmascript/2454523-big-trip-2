import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-section-view.js';
import CreatePointView from '../view/create-point-view.js';
import TripEventListView from '../view/trip-event-list-view.js';
import PointListView from '../view/point-list-view.js';
import { render } from '../render.js';

export default class TripEventPresenter {
  tripEventsComponent = new TripEventView(); // это секция
  tripEventListComponent = new TripEventListView(); // это список - лежит в секции

  //секция tripEventsComponent лежит в tripEventsContainer
  // сортирока  SortView лежит в секции tripEventsComponent
  // список tripEventListComponent  лежит в секции tripEventsComponent
  // форма создания CreatePointView  лежит в списке tripEventListComponent
  // точка маршрута лежит PointListView в списке tripEventListComponent

  constructor ({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init () {
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new SortView(), this.tripEventsComponent.getElement());
    render(this.tripEventListComponent,this.tripEventsComponent.getElement());
    render (new CreatePointView(), this.tripEventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render (new PointListView(), this.tripEventListComponent.getElement());
    }

  }
}

