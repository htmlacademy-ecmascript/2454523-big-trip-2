import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinations = mockDestinations;

  get destinations() {
    return this.#destinations;
  }
}
