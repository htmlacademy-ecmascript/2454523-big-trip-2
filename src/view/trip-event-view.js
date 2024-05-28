import { createElement } from '../render.js';

function tripEventsTemplate () {
  return '<section class="trip-events"></section>';
}

export default class TripEventsView {
  getTemplate () {
    return tripEventsTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
