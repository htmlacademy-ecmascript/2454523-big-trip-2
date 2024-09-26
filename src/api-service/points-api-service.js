import ApiService from '../framework/api-service';
import {Method} from '../const.js';

export default class PointsApiService extends ApiService {
  get points () {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {

    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptPointToSrever(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;

  }

  #adaptPointToSrever(point) {
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
