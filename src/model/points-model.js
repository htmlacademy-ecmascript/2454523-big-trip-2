import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

import { sortPriceDown, sortTimeDurationDown, sortDateFromUp, findPointIndexById } from '../utils/point.js';
import {filter} from '../utils/filter.js';
import { SortType } from '../const.js';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor({pointsApiService, offersModel, destinationsModel}) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#offers = offersModel;
    this.#destinations = destinationsModel;
  }

  getPoints() {
    return this.#points;
  }

  filteredAndSortedPoints(currentSortType, filterType) {
    const filteredPoints = filter[filterType](this.#points);

    switch(currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPriceDown);
      case SortType.TIME:
        return filteredPoints.sort(sortTimeDurationDown);
    }
    return filteredPoints.sort(sortDateFromUp);
  }

  async init() {
    try {
      const [points, offers, destinations] = await Promise.all([
        this.#pointsApiService.points,
        this.#offers.init(),
        this.#destinations.init()
      ]);

      this.#points = points.map(this.#adaptPointToClient);
      this.#offers = offers;
      this.#destinations = destinations;

    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];

    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = findPointIndexById(this.#points, update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptPointToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint (updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint (updateType, update) {
    const index = findPointIndexById(this.#points, update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];
    this._notify(updateType);
  }

  #adaptPointToClient(point) {
    const {
      base_price: basePrice,
      date_from: dateFrom,
      date_to: dateTo,
      is_favorite: isFavorite,
      ...rest
    } = point;

    return {
      ...rest,
      basePrice,
      dateFrom: dateFrom !== null ? new Date(dateFrom) : dateFrom,
      dateTo: dateTo !== null ? new Date(dateTo) : dateTo,
      isFavorite
    };
  }
}
