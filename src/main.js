import FilterView from './view/filter-view.js';
import TripEventsPresenter from './presenter/page-body-presenter.js';
import { render } from './render.js';


const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const pageBodyContainer = pageMainElement.querySelector('.page-body__container');

const tripEventsPresenter = new TripEventsPresenter({tripEventsContainer: pageBodyContainer});

render(new FilterView(), tripControlsFiltersElement);
tripEventsPresenter.init();

