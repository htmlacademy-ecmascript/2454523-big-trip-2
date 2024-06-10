import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

export {getRandomArrayElement, humanizeDate};
