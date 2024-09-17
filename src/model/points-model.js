import Observable from '../framework/observable.js';
import {getRandomPoint} from '../mock/points.js';

import { sortPriceDown, sortTimeDurationDown, sortDateFromUp, findPointIndexById } from '../utils/point.js';
import {filter} from '../utils/filter.js';
import { SortType } from '../const.js';

const POINT_COUNT = 10;

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points);
    });

  }

  get points() {
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

  updatePoint(updateType, update) {
    const index = findPointIndexById(this.#points, update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
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

}
