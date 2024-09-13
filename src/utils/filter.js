import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    const currentDate = new Date();
    return points.filter((point) => point.dateFrom > currentDate);
  },
  [FilterType.PRESENT]: (points) => {
    const currentDate = new Date();
    return points.filter((point) => point.dateFrom <= currentDate && point.dateTo >= currentDate);
  },
  [FilterType.PAST]: (points) => {
    const currentDate = new Date();
    return points.filter((point) => point.dateTo < currentDate);
  }
};

export {filter};
