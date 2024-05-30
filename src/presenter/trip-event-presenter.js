import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-section-view.js';
//import CreatePointView from '../view/create-point-view.js'; - импорт класса форма создания
import TripEventListView from '../view/trip-event-list-view.js';
import PointListView from '../view/point-list-view.js';
import EditPointView from '../view/edit-point-view.js';
import { render } from '../render.js';

export default class TripEventPresenter {
  tripEventsComponent = new TripEventView();
  tripEventListComponent = new TripEventListView();
  constructor ({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init () {
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new SortView(), this.tripEventsComponent.getElement());
    render(this.tripEventListComponent,this.tripEventsComponent.getElement());
    render (new EditPointView(), this.tripEventListComponent.getElement());
    //render (new CreatePointView(), this.tripEventListComponent.getElement()); - отрисовка формы созадния

    for (let i = 0; i < 3; i++) {
      render (new PointListView(), this.tripEventListComponent.getElement());
    }

  }
}

