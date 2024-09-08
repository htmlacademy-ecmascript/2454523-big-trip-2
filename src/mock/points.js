import { nanoid } from 'nanoid';
import {getRandomArrayElement} from '../utils/common.js';

const mockPoints = [
  {
    id: 1,
    type: 'taxi',
    destination: 1,
    dateFrom: new Date('2024-09-06T00:55:56.845Z'),
    dateTo: new Date('2024-09-09T01:25:56.845Z'),
    basePrice: 1100,
    isFavorite: false,
    offers: [
      'taxi-2'
    ],
  },
  {
    id: 2,
    type: 'bus',
    destination: 2,
    dateFrom: new Date('2024-02-10T03:55:56.845Z'),
    dateTo: new Date('2024-02-10T04:05:56.845Z'),
    basePrice: 100,
    isFavorite: true,
    offers: [
      'bus-1'
    ],
  },
  {
    id: 3,
    type: 'train',
    destination: 3,
    dateFrom: new Date('2024-03-10T05:55:56.845Z'),
    dateTo: new Date('2024-03-10T06:38:56.845Z'),
    basePrice: 350,
    isFavorite: false,
    offers: [
    ],
  },
  {
    id: 4,
    type: 'ship',
    destination: 1,
    dateFrom: new Date('2024-04-10T07:40:56.845Z'),
    dateTo: new Date('2024-04-10T08:55:56.845Z'),
    basePrice: 500,
    isFavorite: false,
    offers: [
      'ship-1'
    ],
  },
  {
    id: 5,
    type: 'drive',
    destination: 2,
    dateFrom: new Date('2024-05-10T10:05:56.845Z'),
    dateTo: new Date('2024-05-10T10:38:56.845Z'),
    basePrice: 1000,
    isFavorite: true,
    offers: [
      'drive-1'
    ],
  },
  {
    id: 6,
    type: 'flight',
    destination: '',
    dateFrom: new Date('2024-06-10T11:56:56.845Z'),
    dateTo: new Date('2024-06-10T15:24:56.845Z'),
    basePrice: '',
    isFavorite: false,
    offers: [
      'flight-1', 'flight-2'
    ],
  },
  {
    id: 7,
    type: 'check-in',
    destination: 4,
    dateFrom: new Date('2024-07-10T13:48:56.845Z'),
    dateTo: new Date('2024-07-13T14:55:56.845Z'),
    basePrice: 5000,
    isFavorite: true,
    offers: [
      'check-in-1', 'check-in-3'
    ],
  },
  {
    id: 8,
    type: 'sightseeing',
    destination: 2,
    dateFrom: new Date('2024-08-10T15:55:56.845Z'),
    dateTo: new Date('2024-08-10T16:55:56.845Z'),
    basePrice: 600,
    isFavorite: false,
    offers: [
      'sightseeing-1', 'sightseeing-2'
    ],
  },
  {
    id: 9,
    type: 'restaurant',
    destination: 3,
    dateFrom: new Date('2024-09-20T18:00:56.845Z'),
    dateTo: new Date('2024-09-20T20:00:56.845Z'),
    basePrice: 700,
    isFavorite: false,
    offers: [
      'restaurant-1'
    ],
  }
];

function getRandomPoint() {
  return {
    uniqId: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };

}

export {getRandomPoint};
