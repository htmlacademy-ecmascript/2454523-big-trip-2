import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = mockDestinations;

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations)=> {
      console.log(destinations);
    });
  }

  get destinations() {
    return this.#destinations;
  }
}
