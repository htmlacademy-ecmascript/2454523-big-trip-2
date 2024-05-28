import SortView from '../view/sort-view.js';
import TripEventsView from '../view/trip-event-view.js';
import { render } from '../render.js';

export default class TripEventsPresenter {
  tripEventsComponent = new TripEventsView();

  constructor ({tripEventsContainer}) {
    this.tripEventsContainer = tripEventsContainer;
  }

  init () {
    render(this.tripEventsComponent, this.tripEventsContainer);
    render(new SortView(), this.tripEventsComponent.getElement());
  }
}

