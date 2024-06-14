import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getFormattedType (type) {
  const formattedType = type[0].toUpperCase() + type.slice(1);
  return formattedType;
}

function calculateDuration(point) {
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);
  const differenceInMilliseconds = dateTo.diff(dateFrom);

  const minutesTotal = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hoursTotal = Math.floor(minutesTotal / 60);
  const days = Math.floor(hoursTotal / 24);
  const hours = hoursTotal % 24;
  const minutes = minutesTotal % 60;

  let formattedDuration = '';

  if (days > 0) {
    formattedDuration = `${days}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else if (hours > 0) {
    formattedDuration = `${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
  } else {
    formattedDuration = `${minutes}M`;
  }

  return formattedDuration;
}

function getOffersForPoint (point, offers) {

  const pointTypeOffer = offers.find((offer) => offer.type === point.type);

  if (!pointTypeOffer) {
    return '';
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

export {getRandomArrayElement, humanizeDate, getFormattedType, calculateDuration, getOffersForPoint, getDestinationForPoint};
