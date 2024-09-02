import Observable from '../framework/observable.js';
import { mockOffers } from '../mock/offers.js';

export default class OffersModel extends Observable {
  #offers = mockOffers;

  get offers() {
    return this.#offers;
  }
}
