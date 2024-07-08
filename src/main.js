import FilterView from './view/filter-view.js';
import TripEventPresenter from './presenter/trip-event-presenter.js';
import {render} from './framework/render.js';
import PointsModel from './model/points-model.js';
import ButtonNewEventView from './view/button-new-event-view.js';


const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageBodyContainerElement = pageMainElement.querySelector('.page-body__container');
const pointsModel = new PointsModel();
const filterComponent = new FilterView();
const buttonNewEventComponent = new ButtonNewEventView();

const tripEventPresenter = new TripEventPresenter({tripEventsContainer: pageBodyContainerElement,
  pointsModel
});

render(filterComponent, tripControlsFiltersElement);
render(buttonNewEventComponent, tripMainElement);

tripEventPresenter.init();
