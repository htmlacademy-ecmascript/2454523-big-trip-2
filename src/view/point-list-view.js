// import { createElement } from '../render.js';
// import { humanizeDate, calculateDuration } from '../utils.js';
// import {getOffersForPoint} from '../mock/point.js';
// import {DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT} from '../const.js';

// function createSelectedOffersTemplate(point) {
//   const pointTypeOffer = getOffersForPoint(point);

//   const pointOffers = point.offers.map((offerId) => {

//     const foundOffer = pointTypeOffer.offers.find((offer) => offer.id === offerId);
//     if (!foundOffer) {
//       return '';
//     }
//     const {title, price} = foundOffer;


//     return `<li class="event__offer">
//       <span class="event__offer-title">${title}</span>
//       &plus;&euro;&nbsp;
//       <span class="event__offer-price">${price}</span>
//     </li>`;
//   });

//   return pointOffers.join('');
// }


// function createPointListTemplate (point) {

//   const {type, destination, dateFrom,dateTo,basePrice, isFavorite} = point;

//   const favoriteClassName = isFavorite
//     ? 'event__favorite-btn--active'
//     : '';

//   const selectedOfferTemplate = createSelectedOffersTemplate(point);
//   const duration = calculateDuration(point);

//   return (
//     `<li class="trip-events__item">
//               <div class="event">
//                 <time class="event__date" datetime="${dateFrom}">${humanizeDate(dateFrom,DATE_FORMAT)}</time>
//                 <div class="event__type">
//                   <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
//                 </div>
//                 <h3 class="event__title">${type}${' '}${destination}</h3>
//                 <div class="event__schedule">
//                   <p class="event__time">
//                     <time class="event__start-time" datetime="${humanizeDate(dateFrom, DATETIME_FORMAT)}">${humanizeDate(dateFrom, TIME_FORMAT)}</time>
//                     &mdash;
//                     <time class="event__end-time" datetime="${humanizeDate(dateTo,DATETIME_FORMAT)}">${humanizeDate(dateTo, TIME_FORMAT)}</time>
//                   </p>
//                   <p class="event__duration">${duration}</p>
//                 </div>
//                 <p class="event__price">
//                   &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
//                 </p>
//                 <h4 class="visually-hidden">Offers:</h4>
//                 <ul class="event__selected-offers">
//                  ${selectedOfferTemplate}
//                 </ul>
//                 <button class="event__favorite-btn ${favoriteClassName}" type="button">
//                   <span class="visually-hidden">Add to favorite</span>
//                   <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
//                     <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
//                   </svg>
//                 </button>
//                 <button class="event__rollup-btn" type="button">
//                   <span class="visually-hidden">Open event</span>
//                 </button>
//               </div>
//             </li>`
//   );
// }

// export default class PointListView {

//   constructor ({point}) {
//     this.point = point;
//   }

//   getTemplate () {
//     return createPointListTemplate(this.point);
//   }

//   getElement () {
//     if(!this.element) {
//       this.element = createElement(this.getTemplate());
//     }
//     return this.element;
//   }

//   removeElement () {
//     this.element = null;
//   }
// }

