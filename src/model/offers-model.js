import Observable from '../framework/observable.js';
//import { mockOffers } from '../mock/offers.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  //#offers = mockOffers;
  #offers = [];

  constructor ({offersApiService}) {
    super();
    this.#offersApiService = offersApiService;

    // this.#offersApiService.offers.then((offers)=> {
    //   console.log(offers);
    // });

  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;

    } catch(err) {
      this.#offers = [];
    }
  }
}
