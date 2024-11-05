import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;

  }

  getOffers() {
    return this.#offers;
  }

  isServerError() {
    return this.#offersApiService.isOffersServerError();
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;

    } catch(err) {
      if(this.isServerError()) {
        throw new Error('Failed to load offers due to server issues.');
      } else {
        this.#offers = [];
      }
    }
  }
}
