import FilterPresenter from './presenter/filter-presenter.js';
import TripEventPresenter from './presenter/trip-event-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import ButtonNewEventView from './view/button-new-event-view.js';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageBodyContainerElement = pageMainElement.querySelector('.page-body__container');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();


const tripEventPresenter = new TripEventPresenter({tripEventsContainer: pageBodyContainerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy:handleNewPointFormClose
});


const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  pointsModel
});

const buttonNewEventComponent = new ButtonNewEventView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  buttonNewEventComponent.element.disabled = false;
}

function handleNewPointButtonClick(){
  tripEventPresenter.createPoint();
  buttonNewEventComponent.element.disabled = true;
}

render(buttonNewEventComponent, tripMainElement);
filterPresenter.init();
tripEventPresenter.init();
