import AbstractView from '../framework/view/abstract-view.js';

function tripEventTemplate () {
  return '<section class="trip-events"></section>';
}

export default class TripEventView extends AbstractView {
  get template () {
    return tripEventTemplate();
  }
}
