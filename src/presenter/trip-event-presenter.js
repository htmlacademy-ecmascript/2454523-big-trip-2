import SortView from '../view/sort-view.js';
import TripEventView from '../view/trip-event-view.js';
import NewPointPresenter from './new-point-presenter.js';
import TripEventListView from '../view/trip-event-list-view.js';
import {remove, render,RenderPosition} from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadDataView from '../view/failed-load-data-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UserAction, UpdateType, FilterType, TimeLimit } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class TripEventPresenter {
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;

  #tripEventComponent = new TripEventView();
  #tripEventListComponent = new TripEventListView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #noDataComponent = null;
  #sortComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #isLoading = true;
  #isCreatingFormOpen = false;
  #UiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor ({tripEventsContainer,pointsModel, destinationsModel, offersModel, filterModel, onNewPointDestroy}) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });


    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

  }

  get points() {
    return this.#pointsModel.filteredAndSortedPoints(this.#currentSortType, this.#filterModel.filter);
  }


  init () {
    this.#renderBoard();
  }

  // createPoint () {
  //   this.#isCreatingFormOpen = true;
  //   this.#currentSortType = SortType.DAY;
  //   this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  //   this.#newPointPresenter.init(this.#offersModel.getOffers(), this.#destinationsModel.getDestinations());
  // }

  createPoint () {
    this.#isCreatingFormOpen = true;
    this.#currentSortType = SortType.DAY;
    if(this.#pointsModel.getPoints().length !== 0){
      this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    }
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }
    this.#newPointPresenter.init(this.#offersModel.getOffers(), this.#destinationsModel.getDestinations());
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async(actionType, updateType, update) => {
    this.#UiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update).then(() => {
            this.#newPointPresenter.destroy();
          });
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          if (this.#pointPresenters.get(update.id)) {
            this.#pointPresenters.get(update.id).setAborting();
          }
        }
        break;
    }

    this.#UiBlocker.unblock();

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#offersModel.getOffers(), this.#destinationsModel.getDestinations());
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#noDataComponent);
        remove(this.#noPointComponent);
        this.#renderBoard();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        remove(this.#noDataComponent);
        remove(this.#noPointComponent);
        this.#renderFailedToLoad();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort () {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offers, destinations) {
    const pointPresenter = new PointPresenter({
      tripEventListComponent: this.#tripEventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points, offers, destinations){
    points.forEach((point) => this.#renderPoint(point, offers, destinations));
  }

  #renderLoading() {
    render(this.#loadingComponent,this.#tripEventComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints () {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterModel.filter
    });
    render(this.#noPointComponent,this.#tripEventComponent.element,RenderPosition.AFTERBEGIN);
  }

  #renderFailedToLoad () {
    const failedLoadDataText = new FailedLoadDataView();
    render(failedLoadDataText, this.#tripEventComponent.element,RenderPosition.AFTERBEGIN);
  }

  #clearBoard ({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if(this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType){
      this.#currentSortType = SortType.DAY;
    }

  }

  #renderBoard () {
    render(this.#tripEventComponent, this.#tripEventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isCreatingFormOpen) {
      this.#renderNoPoints();
      return;
    }

    if (this.points.length === 0 || this.#offersModel.getOffers().length === 0 || this.#destinationsModel.getDestinations().length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#tripEventListComponent,this.#tripEventComponent.element);

    this.#renderPoints(this.points,this.#offersModel.getOffers(), this.#destinationsModel.getDestinations());
  }

}
