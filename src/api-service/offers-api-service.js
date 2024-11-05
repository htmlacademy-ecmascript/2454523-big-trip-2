import ApiService from '../framework/api-service';


export default class OffersApiService extends ApiService {
  #isOffersServerError = false;

  get offers () {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse)
      .catch((err) => {
        this.#isOffersServerError = true;
        throw new Error(`Server unavailable: ${err.message}`);

      });
  }

  isOffersServerError () {
    return this.#isOffersServerError;
  }

}
