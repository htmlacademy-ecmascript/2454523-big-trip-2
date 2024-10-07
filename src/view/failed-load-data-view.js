import AbstractView from '../framework/view/abstract-view.js';

function createFailedLoadDataTemplate () {
  // return '<p class="trip-events__msg">Failed to load latest route information</p>';
  return '<section class="trip-events"> <h2 class="visually-hidden">Trip events</h2> <p class="trip-events__msg">Failed to load latest route information</p></section>';

}

export default class FailedLoadDataView extends AbstractView {

  get template () {
    return createFailedLoadDataTemplate();
  }
}
