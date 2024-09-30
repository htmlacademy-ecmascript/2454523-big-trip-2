import AbstractView from '../framework/view/abstract-stateful-view.js';
import {getDestinationForPoint} from '../utils/point.js';
import {formatTripDatesForHeader} from '../utils/date.js';


function createTripInfoTitleTemplate (points, destinations) {
  const firstDestination = getDestinationForPoint(points[0], destinations);
  const firstNameOfDestination = firstDestination.name;
  const lastDestination = getDestinationForPoint(points[points.length - 1], destinations);
  const lastNameOfDestination = lastDestination.name;

  //магическое число надо будет перенести в константы
  const secondNameOfDestination = getDestinationForPoint(points[1], destinations).name;

  return `<h1 class="trip-info__title">${firstNameOfDestination} &mdash; ${secondNameOfDestination} &mdash; ${lastNameOfDestination}</h1>`;
}

function createTripInfoDatesTemplate (points) {
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;
  const formattedDates = formatTripDatesForHeader(dateFrom, dateTo);
  return `<p class="trip-info__dates">${formattedDates}</p> `;
}

function createTripInfoMainTemplate (points, destinations) {
  return `  <div class="trip-info__main">
              ${createTripInfoTitleTemplate(points, destinations)}
              ${createTripInfoDatesTemplate (points)}
            </div>`;
}

function createTripInfoMCostTemplate () {
  return `  <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`;
}

function createTripInfoTemplate (points, destinations) {
  return `<section class="trip-main__trip-info  trip-info">
  ${createTripInfoMainTemplate(points, destinations)}
  ${createTripInfoMCostTemplate()}
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor ({points, offers, destinations}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createTripInfoTemplate (this.#points, this.#destinations);
  }
}
