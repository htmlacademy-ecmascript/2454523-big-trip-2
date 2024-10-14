import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  getDestinations() {
    return this.#destinations;
  }

  isServerError() {
    return this.#destinationsApiService.isDestinationsServerError();
  }


  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;

    } catch(err) {
      if(this.isServerError()) {
        throw new Error('Failed to load destinations due to server issues.');
      } else {
        this.#destinations = [];
      }

    }
  }
}
