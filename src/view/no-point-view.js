import AbstractView from '../framework/view/abstract-view.js';
import { TextNoEvent } from '../const.js';

function createNoPoinTemplate () {
  return (
    `<p class="trip-events__msg">${TextNoEvent.EVERYTHING}</p>`
  );
}

export default class NoPointView extends AbstractView {
  get template () {
    return createNoPoinTemplate();
  }
}
