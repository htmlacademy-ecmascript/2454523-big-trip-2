import AbstractView from '../framework/view/abstract-view.js';
import { NoDataType } from '../const.js';

const NoDataText = {
  [NoDataType.OFFERS]:'Offers are temporarily unavailable. Please try again later',
  [NoDataType.DESTINATIONS]:'Destinations are temporarily unavailable. Please try again later',
};

function createNoDataTemplate (noDataType) {
  const noDataTextValue = NoDataText[noDataType];
  return (
    `<p class="trip-events__msg">${noDataTextValue}</p>`
  );
}

export default class NoDataView extends AbstractView {
  #noDataType = null;

  constructor({noDataType}) {
    super();
    this.#noDataType = noDataType;
  }

  get template () {
    return createNoDataTemplate(this.#noDataType);
  }
}
