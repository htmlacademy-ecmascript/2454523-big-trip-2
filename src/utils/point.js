import { calculateDurationInMilliseconds } from './date.js';
import dayjs from 'dayjs';

function getOffersForPoint (point, offers) {

  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return { offers: [] };
  }
  return pointTypeOffer;
}


function getDestinationForPoint (point, destinations) {

  const destinationData = destinations.find((destination) => destination.id === point.destination);

  if (!destinationData) {
    return '';
  }
  return destinationData;
}

function getNameOfDestinations (destinations) {
  return destinations.map((destination) => destination.name);
}

function findPointIndexById (points, update) {
  return points.findIndex((point) => point.id === update.id);
}

function getWeightForNullPrice(priceA, priceB) {
  if (priceA === null && priceB === null) {
    return 0;
  }

  if (priceA === null) {
    return 1;
  }

  if (priceB === null) {
    return -1;
  }

  return null;
}

function sortPriceDown(pointA, pointB) {
  const weight = getWeightForNullPrice(pointA.basePrice, pointB.basePrice);
  return weight !== null ? weight : pointB.basePrice - pointA.basePrice;
}


function getWeightForNullTimeDuration (timeDurationA, timeDurationB) {
  if (timeDurationA === null && timeDurationB === null) {
    return 0;
  }

  if (timeDurationA === null) {
    return 1;
  }

  if (timeDurationB === null) {
    return -1;
  }

  return null;
}

function sortTimeDurationDown(pointA, pointB) {
  const timeDurationA = calculateDurationInMilliseconds(pointA);
  const timeDurationB = calculateDurationInMilliseconds(pointB);
  const weight = getWeightForNullTimeDuration(timeDurationA, timeDurationB);

  return weight !== null ? weight : timeDurationB - timeDurationA;
}

function getWeightForNullDateFrom(dateFromA, dateFromB) {
  if (dateFromA === null && dateFromB === null) {
    return 0;
  }

  if (dateFromA === null) {
    return 1;
  }

  if (dateFromB === null) {
    return -1;
  }

  return null;
}

function sortDateFromUp(pointA, pointB) {
  const weight = getWeightForNullDateFrom(pointA.dateFrom, pointB.dateFrom);

  return weight !== null ? weight : dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function isValidPrice(basePrice) {
  const correctPrice = parseInt(basePrice, 10);
  return (/^0$/.test(basePrice) || /^[1-9][0-9]*$/.test(basePrice)) && correctPrice >= 0;
}

function isDateFromEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isDurationsEqual(pointA, pointB) {
  const durationA = calculateDurationInMilliseconds(pointA);
  const durationB = calculateDurationInMilliseconds(pointB);

  return durationA === durationB;
}

function isPriceEqual (priceA,priceB) {
  return priceA === priceB;
}


function calculateCostOfPoint (point, offers) {
  const pointTypeOffer = getOffersForPoint(point, offers);

  const pointOffersPrice = point.offers.map((offerId) => {

    const selectedOffer = pointTypeOffer.offers.find((offer) => offer.id === offerId);
    if (!selectedOffer) {
      return '';
    }
    const {price} = selectedOffer;

    return price;
  });

  const costOfPoint = pointOffersPrice.reduce((accumulator, currentValue) => accumulator + currentValue, point.basePrice);
  return costOfPoint;
}

export {getOffersForPoint,
  getDestinationForPoint,
  findPointIndexById,
  sortPriceDown,
  sortTimeDurationDown,
  sortDateFromUp,
  isValidPrice,
  isDateFromEqual,
  isDurationsEqual,
  isPriceEqual,
  getNameOfDestinations,
  calculateCostOfPoint
};
