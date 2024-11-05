import ApiService from '../framework/api-service';
import {Method} from '../const.js';

export default class PointsApiService extends ApiService {
  #isServerError = false;

  get points () {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse)
      .catch((err) => {
        this.#isServerError = true;
        throw new Error(`Server unavailable: ${err.message}`);

      });
  }

  isServerError() {
    return this.#isServerError;
  }

  async updatePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;

  }

  async addPoint(point) {

    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;

  }

  async deletePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;

  }

  #adaptPointToServer(point) {
    const {
      basePrice,
      dateFrom,
      dateTo,
      isFavorite,
      ...rest
    } = point;

    return {
      ...rest,
      'base_price': parseInt(basePrice,10),
      'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : null,
      'date_to': dateTo instanceof Date ? dateTo.toISOString() : null,
      'is_favorite': isFavorite,
    };
  }
}
