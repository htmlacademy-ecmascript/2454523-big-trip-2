import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    type: 'Taxi',
    destination: 'Chamonix',
    dateFrom: new Date('2024-01-10T00:55:56.845Z'),
    dateTo: new Date('2024-01-10T01:55:56.845Z'),
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'taxi-2'
    ],
  },
  {
    type: 'Bus',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-02-10T03:55:56.845Z'),
    dateTo: new Date('2024-02-10T04:55:56.845Z'),
    basePrice: 100,
    isFavorite: true,
    offers: [
      'bus-1'
    ],
  },
  {
    type: 'Train',
    destination: 'Geneva',
    dateFrom: new Date('2024-03-10T05:55:56.845Z'),
    dateTo: new Date('2024-03-10T06:55:56.845Z'),
    basePrice: 350,
    isFavorite: false,
    offers: [
      'train-1'
    ],
  },
  {
    type: 'Ship',
    destination: 'Chamonix',
    dateFrom: new Date('2024-04-10T07:55:56.845Z'),
    dateTo: new Date('2024-04-10T08:55:56.845Z'),
    basePrice: 500,
    isFavorite: false,
    offers: [
      'ship-1'
    ],
  },
  {
    type: 'Drive',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-05-10T09:55:56.845Z'),
    dateTo: new Date('2024-05-10T10:55:56.845Z'),
    basePrice: 1000,
    isFavorite: true,
    offers: [
      'drive-1'
    ],
  },
  {
    type: 'Flight',
    destination: 'Geneva',
    dateFrom: new Date('2024-06-10T11:55:56.845Z'),
    dateTo: new Date('2024-06-10T12:55:56.845Z'),
    basePrice: 2000,
    isFavorite: false,
    offers: [
      'flight-1', 'flight-2'
    ],
  },
  {
    type: 'Check-in',
    destination: 'Chamonix',
    dateFrom: new Date('2024-07-10T13:55:56.845Z'),
    dateTo: new Date('2024-07-10T14:55:56.845Z'),
    basePrice: 5000,
    isFavorite: true,
    offers: [
      'check-in-1', 'check-in-3'
    ],
  },
  {
    type: 'Sightseeing',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-08-10T15:55:56.845Z'),
    dateTo: new Date('2024-08-10T16:55:56.845Z'),
    basePrice: 600,
    isFavorite: false,
    offers: [
      'sightseeing-1', 'sightseeing-2'
    ],
  },
  {
    type: 'Restaurant',
    destination: 'Geneva',
    dateFrom: new Date('2024-09-10T17:55:56.845Z'),
    dateTo: new Date('2024-09-10T18:55:56.845Z'),
    basePrice: 700,
    isFavorite: false,
    offers: [
      'restaurant-1'
    ],
  }
];

const mockOffers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 'taxi-1',
        title: 'Order Uber',
        price: 120
      },
      {
        id: 'taxi-2',
        title: 'Select music',
        price: 50
      }
    ]
  },
  {
    type: 'Bus',
    offers: [
      {
        id: 'bus-1',
        title: 'add meal',
        price: 30
      }
    ]
  },{
    type: 'Train',
    offers: [
      {
        id: 'train-1',
        title: 'Choose a seat',
        price: 50
      }
    ]
  },{
    type: 'Ship',
    offers: [
      {
        id: 'ship-1',
        title: 'Choose a seat',
        price: 20
      }
    ]
  },{
    type: 'Drive',
    offers: [
      {
        id: 'drive-1',
        title: 'Rent a car',
        price: 1000
      }
    ]
  },{
    type: 'Flight',
    offers: [
      {
        id: 'flight-1',
        title: 'Add luggage',
        price: 120
      },
      {
        id: 'flight-2',
        title: 'Switch to comfort',
        price: 50
      },
      {
        id: 'flight-3',
        title: 'Add meal',
        price: 30
      },
      {
        id: 'flight-4',
        title: 'Choose seats',
        price: 150
      },
    ]
  },{
    type: 'Check-in',
    offers: [
      {
        id: 'check-in-1',
        title: 'Add breakfast',
        price: 300
      },
      {
        id: 'check-in-2',
        title: 'Add dinner',
        price: 350
      },
      {
        id: 'check-in-3',
        title: 'All inclusive',
        price: 700
      }
    ]
  },{
    type: 'Sightseeing',
    offers: [
      {
        id: 'sightseeing-1',
        title: 'Book tickets',
        price: 120
      },
      {
        id: 'sightseeing-2',
        title: 'Lunch in city',
        price: 50
      }
    ]
  },{
    type: 'Restaurant',
    offers: [
      {
        id: 'restaurant-1',
        title: 'meet the chef',
        price: 120
      }
    ]
  },
];

const mockDestinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=5',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Amsterdam is the capital and most populated city of the Netherlands.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=6',
        description: 'van gogh museum'
      }
    ]
  },
  {
    id: 3,
    description: 'Geneva is the second-most populous city in Switzerland (after Zürich) and the most populous of the French-speaking Romandy.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=7',
        description: 'Geneva Cathedral'
      }
    ]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function createPointListOfferTemplate(point) {
  //получаем объект офферов по типу точки маршрута
  const pointTypeOffer = mockOffers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return '';
  }

  // pointOffers - это массив с перечисленными id офферов (отрисованными)
  const pointOffers = point.offers.map((offerId) => {

    // foundOffer - это объект, описывающий конкретный оффер по соответствующему id
    const foundOffer = pointTypeOffer.offers.find((offer) => offer.id === offerId);
    if (!foundOffer) {
      return '';
    }
    const {title, price} = foundOffer;


    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
  });

  return pointOffers.join('');
}

function createPointListAllOfferTemplate(point) {
  const pointTypeOffer = mockOffers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return '';
  }


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

// function createDescriptionOfDestinationTemplate (point) {
//   const destinationData = mockDestinations.find((destination) => destination.name === point.destination);
//   const {description} = destinationData;

//   return `<section class="event__section  event__section--destination">
//           <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//           <p class="event__destination-description">${description}</p>
//         </section>`;

// }

function getDescriptionOfDestination (point) {
  const destinationData = mockDestinations.find((destination) => destination.name === point.destination);
  const {description} = destinationData;
  return description;
}


export {getRandomPoint, createPointListOfferTemplate, createPointListAllOfferTemplate, getDescriptionOfDestination };
