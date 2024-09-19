import Observable from '../framework/observable.js';
//import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  //#destinations = mockDestinations;
  #destinations = [];

  constructor ({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;

    // this.#destinationsApiService.destinations.then((destinations)=> {
    //   console.log(destinations);
    // });

  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;

    } catch(err) {
      this.#destinations = [];
    }
  }
}
