import AbstractView from '../framework/view/abstract-view.js';
import { POINT_TYPES, DESTINATIONS, DATETIME_FORMAT_FOR_EDIT_FORM } from '../const.js';
import { humanizeDate } from '../utils/date.js';
import { getFormattedType } from '../utils/common.js';
import {getOffersForPoint} from '../utils/point.js';
import {getDestinationForPoint} from '../utils/point.js';

function createEditPointTypePointTemplate () {
  return POINT_TYPES.map((type)=> `<div class="event__type-item">
<input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
<label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${getFormattedType(type)}</label>
</div> `).join('');
}

function createOffersTemplate(point, offers) {
  const pointTypeOffer = getOffersForPoint(point,offers);

  if (pointTypeOffer.offers.length === 0) {
    return '';
  }

  const pointAllOffers = pointTypeOffer.offers.map((offer) => {

    const checked = point.offers.includes(offer.id) ? 'checked' : '';
    const {title, price,id} = offer;
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-${id}" ${checked}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
  }
  );


  return `<section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
    ${pointAllOffers.join('')}
  </div>
  </section>`;
}

function createEditPointDestinationOptionTemplate () {
  return DESTINATIONS.map((destination)=>`<option value="${destination}"></option>`).join('');
}

function createDescriptionOfDestinationTemplate (point,destinations) {
  const destinationData = getDestinationForPoint(point, destinations);
  if (point.destination === '' || destinationData.description === '') {
    return '';
  }

  const {description, pictures} = destinationData;
  const photoOfDestination = pictures.map((picture) => `<img class="event__photo" src=${picture.src}" alt="Event photo"></img>`);
  return `<section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${description}</p>

                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                   ${photoOfDestination}
                    </div>
                  </div>
                </section>
              </section>`;
}


function createEditPointTemplate (point, offers, destinations) {

  const {type, dateFrom,dateTo,basePrice} = point;
  const destinationData = getDestinationForPoint(point, destinations);
  let {name} = destinationData;
  if (point.destination === '') {
    name = '';
  }
  const typeTemplate = createEditPointTypePointTemplate();
  const destinationTemplate = createEditPointDestinationOptionTemplate();
  const offerTemplate = createOffersTemplate(point, offers);
  const descriptionOfDestinationTemplate = createDescriptionOfDestinationTemplate(point, destinations);

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
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
            ${offerTemplate}

      ${descriptionOfDestinationTemplate}
      </section>
    </form>
  </li>`
  );
}

export default class EditPointView extends AbstractView {
  #point = null;
  #offers = [];
  #destinations = [];
  #handleForSubmit = null;

  constructor ({point, offers, destinations, onFormSubmit}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this. #handleForSubmit = onFormSubmit;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template () {
    return createEditPointTemplate(this.#point, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this. #handleForSubmit(this.#point, this.#offers, this.#destinations);

  };
}
