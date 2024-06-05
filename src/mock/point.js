// {
//   "base_price": 1100,
//   "date_from": "2019-07-10T22:55:56.845Z",
//   "date_to": "2019-07-11T11:22:13.375Z",
//   "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
//   "is_favorite": false,
//   "offers": [
//     "b4c3e4e6-9053-42ce-b747-e281314baa31"
//   ],
//   "type": "taxi"
// }

// Для создания новой точки маршрута пользователь заполняет:

// Тип точки маршрута (один из: Taxi, Bus, Train, Ship, Drive, Flight, Check-in, Sightseeing, Restaurant).
// Пункт назначения. Выбирается из списка предложенных значений, полученных с сервера.
//Пользователь не может ввести свой вариант для пункта назначения.
// Дата и время начала события. Выбор времени и даты осуществляется с помощью библиотеки flatpickr.js.
//Выбранная дата и время отображаются в поле в формате: день/месяц/год часы:минуты (например «25/12/19 16:00»).
// Дата и время окончания события. Формат и требования аналогичны дате начала. Дата окончания не может быть меньше даты начала события.
// Стоимость. Целое положительное число.
// Дополнительные опции. В зависимости от типа точки маршрута пользователь может выбрать дополнительные опции (offers).
// Дополнительные опции отображаются в блоке offers. Набор дополнительных опций, которые может выбрать пользователь при создании точки маршрута,
// зависит от типа точки маршрута

import {getRandomArrayElement} from '../utils.js';

const mockPoints = [
  {
    type: 'Taxi',
    destination: 'Chamonix',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'taxi-1', 'taxi-2'
    ],
  },
  {
    type: 'Bus',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-02-01'),
    dateTo: new Date('2024-02-10'),
    basePrice: 100,
    isFavorite: true,
    offers: [
      'bus-1'
    ],
  },
  {
    type: 'Train',
    destination: 'Geneva',
    dateFrom: new Date('2024-03-01'),
    dateTo: new Date('2024-03-05'),
    basePrice: 350,
    isFavorite: false,
    offers: [
      'train-1'
    ],
  },
  {
    type: 'Ship',
    destination: 'Chamonix',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 500,
    isFavorite: false,
    offers: [
      'ship-1'
    ],
  },
  {
    type: 'Drive',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 1000,
    isFavorite: true,
    offers: [
      'drive-1'
    ],
  },
  {
    type: 'Flight',
    destination: 'Geneva',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 2000,
    isFavorite: false,
    offers: [
      'flight-1', 'flight-2'
    ],
  },
  {
    type: 'Check-in',
    destination: 'Chamonix',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 5000,
    isFavorite: true,
    offers: [
      'check-in-1', 'check-in-2', 'check-in-3'
    ],
  },
  {
    type: 'Sightseeing',
    destination: 'Amsterdam',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
    basePrice: 600,
    isFavorite: false,
    offers: [
      'sightseeing-1', 'sightseeing-2'
    ],
  },
  {
    type: 'Restaurant',
    destination: 'Geneva',
    dateFrom: new Date('2024-01-01'),
    dateTo: new Date('2024-01-05'),
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
      }
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

export {getRandomPoint};
