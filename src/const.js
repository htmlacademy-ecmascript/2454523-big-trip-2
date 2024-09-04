const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DESTINATIONS = ['Amsterdam', 'Geneva', 'Chamonix', 'Moscow'];

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATETIME_FORMAT_FOR_EDIT_FORM = 'DD/MM/YY HH:mm';

const NoEventText = {
  EVERYTHING:'Click New Event to create your first point',
  PAST:'There are no past events now',
  PRESENT:'There are no present events now',
  FUTURE:'There are no future events now',
};

const SortType = {
  DAY:'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const SORT_TYPE_DISABLED = ['event', 'offers'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {POINT_TYPES, DESTINATIONS, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_FOR_EDIT_FORM, NoEventText, SortType, SORT_TYPE_DISABLED, UserAction, UpdateType};

