import { createElement } from '../render.js';

function tripEventTemplate () {
  return '<section class="trip-events"></section>';
}

export default class TripEventView {
  getTemplate () {
    return tripEventTemplate();
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
