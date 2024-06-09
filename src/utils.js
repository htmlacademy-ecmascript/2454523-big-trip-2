import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DURATION_FORMAT = 'D[D] H[H] m[m]';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeEventDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizeEventTime(time) {
  return time ? dayjs(time).format(TIME_FORMAT) : '';
}

function humanizeEventDatetime(datetime) {
  return datetime ? dayjs(datetime).format(DATETIME_FORMAT) : '';
}

export {getRandomArrayElement,humanizeEventDate,humanizeEventTime, humanizeEventDatetime, };
