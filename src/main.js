/* eslint-disable semi */
import FilterPresenter from './presenter/filter-presenter.js';
import TripEventPresenter from './presenter/trip-event-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import ButtonNewEventView from './view/button-new-event-view.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';
import PointsApiService from './api-service/points-api-service.js';

const AUTHORIZATION = 'Basic hS2sfS38wcl1sy4j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageBodyContainerElement = pageMainElement.querySelector('.page-body__container');

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
  offersModel,
  destinationsModel,
});

const filterModel = new FilterModel();


const tripEventPresenter = new TripEventPresenter({tripEventsContainer: pageBodyContainerElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy:handleNewPointFormClose
});

const tripInfoPresenter = new TripInfoPresenter({
  tripInfoContainer: tripMainElement,
  pointsModel,
  offersModel,
  destinationsModel
})

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


pointsModel.init()
  .then(() => tripInfoPresenter.init(), filterPresenter.init(), tripEventPresenter.init())
  .finally(() => {
    render(buttonNewEventComponent, tripMainElement)
  });
