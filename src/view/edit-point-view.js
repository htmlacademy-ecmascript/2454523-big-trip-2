import { createElement } from '../render.js';
import { POINT_TYPE, DESTINATION } from '../const.js';
import {getOffersForPoint, getDescriptionOfDestination} from '../mock/point.js';
import { humanizeDate } from '../utils.js';

const DATETIME_FORMAT_FOR_EDIT_FORM = 'DD/MM/YY HH:mm';

function createEditPointTypePointTemplate () {
  return POINT_TYPE.map((type)=> `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div> `).join('');

}

function createPointListAllOfferTemplate(point) {
  const pointTypeOffer = getOffersForPoint(point);

  const pointAllOffers = pointTypeOffer.offers.map((offer) => {
    const arrayOfTitle = offer.title.trim().split(' ');
    const nameForAttribute = arrayOfTitle[arrayOfTitle.length - 1];

    const checked = point.offers.includes(offer.id) ? 'checked' : '';
    const {title, price} = offer;
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${nameForAttribute}-1" type="checkbox" name="event-offer-${nameForAttribute}" ${checked}>
      <label class="event__offer-label" for="event-offer-${nameForAttribute}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
  }
  );

  return pointAllOffers.join('');
}

function createEditPointDestinationOptionTemplate () {
  return DESTINATION.map((destination)=>`<option value="${destination}"></option>`).join('');
}

function createDescriptionOfDestinationTemplate (point) {
  const description = getDescriptionOfDestination(point);
  return `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        </section>`;
}


function createEditPointTemplate (point) {

  const {type, destination, dateFrom,dateTo,basePrice, offers} = point;
  const typeTemplate = createEditPointTypePointTemplate();
  const destinationTemplate = createEditPointDestinationOptionTemplate();
  const pointListAllOfferTemplate = createPointListAllOfferTemplate(point);
  const descriptionOfDestinationTemplate = createDescriptionOfDestinationTemplate(point);

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typeTemplate}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom,DATETIME_FORMAT_FOR_EDIT_FORM)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DATETIME_FORMAT_FOR_EDIT_FORM)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${pointListAllOfferTemplate}
          </div>
        </section>

      ${descriptionOfDestinationTemplate}
      </section>
    </form>
  </li>`
  );
}

export default class EditPointView {

  constructor ({point}) {
    this.point = point;
  }

  getTemplate () {
    return createEditPointTemplate(this.point);
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  remoleElement () {
    this.element = null;
  }
}
