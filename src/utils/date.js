import dayjs from 'dayjs';

function humanizeDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function calculateDurationInMilliseconds(point) {
  const dateFrom = dayjs(point.dateFrom);
  const dateTo = dayjs(point.dateTo);

  return dateTo.diff(dateFrom);
}

function calculateFormattedDuration(point) {
  const differenceInMilliseconds = calculateDurationInMilliseconds(point);

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


export {humanizeDate, calculateFormattedDuration, calculateDurationInMilliseconds};
