import dayjs from 'dayjs';


function formatTripDatesForHeader(dateFrom, dateTo) {
  const fromDate = dayjs(dateFrom);
  const toDate = dayjs(dateTo);

  if (fromDate.format('MMM') === toDate.format('MMM')) {
    return `${fromDate.format('DD')} — ${toDate.format('DD')} ${fromDate.format('MMM')}`;
  } else {
    return `${fromDate.format('DD MMM')} — ${toDate.format('DD MMM')}`;
  }
}

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
    formattedDuration = `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
  } else if (hours > 0) {
    formattedDuration = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
  } else {
    formattedDuration = `${minutes.toString().padStart(2, '0')}m`;
  }

  return formattedDuration;
}

export {humanizeDate, calculateFormattedDuration, calculateDurationInMilliseconds, formatTripDatesForHeader};
