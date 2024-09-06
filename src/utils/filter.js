import { FilterType } from '../const';


// Everything — полный список точек маршрута;
// Future — список запланированных точек маршрута, т. е. точек, у которых дата начала события больше текущей даты;
// Present — список текущих точек маршрута, т. е. точек, у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
// Past — список пройденных точек маршрута, т. е. точек у которых дата окончания маршрута меньше, чем текущая.

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
