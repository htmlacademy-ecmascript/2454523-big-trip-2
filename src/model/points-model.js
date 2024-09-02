import Observable from '../framework/observable.js';
import {getRandomPoint} from '../mock/points.js';

const POINT_COUNT = 10;

export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

}
