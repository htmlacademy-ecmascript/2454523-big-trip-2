import AbstractView from '../framework/view/abstract-stateful-view.js';
import {getDestinationForPoint, calculateCostOfPoint} from '../utils/point.js';
import {formatTripDatesForHeader} from '../utils/date.js';


function createTripInfoTitleTemplate (points, destinations) {

  if (points.length === 0 || destinations.length === 0) {
    return '';
  }

  const firstNameOfDestination = getDestinationForPoint(points[0], destinations).name;

  if (points.length === 1) {
    return `<h1 class="trip-info__title">${firstNameOfDestination}</h1>`;
  }

  const lastNameOfDestination = getDestinationForPoint(points[points.length - 1], destinations).name;

  if (points.length === 2) {
    return `<h1 class="trip-info__title">${firstNameOfDestination} &mdash; ${lastNameOfDestination}</h1>`;
  }

  let secondNameOfDestination = getDestinationForPoint(points[1], destinations).name;

  if (points.length > 3) {
    secondNameOfDestination = '...';
  }

  return `<h1 class="trip-info__title">${firstNameOfDestination} &mdash; ${secondNameOfDestination} &mdash; ${lastNameOfDestination}</h1>`;
}

function createTripInfoDatesTemplate (points) {
  if (points.length === 0) {
    return '';
  }
  const dateFrom = points[0].dateFrom;
  const dateTo = points[points.length - 1].dateTo;
  const formattedDates = formatTripDatesForHeader(dateFrom, dateTo);
  return `<p class="trip-info__dates">${formattedDates}</p> `;
}

function createTripInfoMainTemplate (points, destinations) {
  if (points.length === 0 || destinations.length === 0) {
    return '';
  }
  return `  <div class="trip-info__main">
              ${createTripInfoTitleTemplate(points, destinations)}
              ${createTripInfoDatesTemplate (points)}
            </div>`;
}

function createTripInfoCostTemplate (points, offers) {
  if (points.length === 0 || offers.length === 0) {
    return '';
  }
  const pointsCosts = points.map((point)=> calculateCostOfPoint(point, offers));
  const totalCost = pointsCosts.reduce ((accumulator, currentValue) => accumulator + currentValue, 0);
  return `  <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
            </p>`;
}

function createTripInfoTemplate (points, destinations, offers) {
  if (points.length === 0 || destinations.length === 0 || offers.length === 0) {
    return '';
  }
  return `<section class="trip-main__trip-info  trip-info">
  ${createTripInfoMainTemplate(points, destinations)}
  ${createTripInfoCostTemplate(points,offers)}
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
    return createTripInfoTemplate (this.#points, this.#destinations, this.#offers);
  }
}
