import AbstractView from '../framework/view/abstract-view.js';
import { NoEventText } from '../const.js';

function createNoPointTemplate () {
  return (
    `<p class="trip-events__msg">${NoEventText.EVERYTHING}</p>`
  );
}

export default class NoPointView extends AbstractView {
  get template () {
    return createNoPointTemplate();
  }
}
