import ApiService from '../framework/api-service';

export default class DestinationsApiService extends ApiService {
  #isDestinationsServerError = false;

  get destinations () {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse)
      .catch((err) => {
        this.#isDestinationsServerError = true;
        throw new Error(`Server unavailable: ${err.message}`);

      });
  }

  isDestinationsServerError (){
    return this.#isDestinationsServerError;
  }

}
