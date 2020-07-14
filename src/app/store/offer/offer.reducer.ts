import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsOffer from './offer.actions';
import { Request } from 'src/app/models/request.model';
import { Offer, OfferFilterName } from 'src/app/models/offer.model';


export const offerFeatureKey = 'offer';

export interface OfferState {
isLoading: boolean;
requestListIsChanging: boolean;
newRequestCount: number;
openedRequest: Request;
requestList: Request[];
filteredRequestList: Request[];
paginatedRequestList: Request[];
paginatorEvents: object;
filterName: string;
mobileFilterOpened: boolean;
}

export const initialOfferState: OfferState = {
  isLoading: false,
  requestListIsChanging: false,
  newRequestCount: null,
  openedRequest: null,
  requestList: [],
  filteredRequestList: [],
  paginatedRequestList: [],
  paginatorEvents: {},
  filterName: OfferFilterName[1],
  mobileFilterOpened: false,

};


export const _offerReducer = createReducer(
  initialOfferState,
  on(ActionsOffer.offerInProgressAction,
    (state: OfferState) => {
    return {
      ...state,
      isLoading: !state.isLoading
    };
    }),
    on(ActionsOffer.requestListIsChangingAction,
      (state: OfferState) => {
      return {
        ...state,
        requestListIsChanging: true
      };
      }),
    on(ActionsOffer.requestListNotChangingAction,
      (state: OfferState) => {
      return {
        ...state,
        requestListIsChanging: false
      };
      }),
    on(ActionsOffer.loadActualRequestListFromDBAction,
      (state: OfferState, { requests }) => {
      return {
        ...state,
        requestList: [
          ...requests
        ]
      };
      }),
    on(ActionsOffer.setNewRequestCounterAction,
      (state: OfferState, { count }) => {
      return {
        ...state,
        newRequestCount : count
      };
      }),
    on(ActionsOffer.setRequestToAnswerAction,
      (state: OfferState, { request }) => {
      return {
        ...state,
      openedRequest: request
      };
      }),
    on(ActionsOffer.closeRequestToAnswerAction,
      (state: OfferState) => {
      return {
        ...state,
      openedRequest : null
      };
      }),
    on(ActionsOffer.setFiltredRequestListAction,
      (state: OfferState, {filteredList}) => {
      return {
        ...state,
        filteredRequestList: filteredList
      };
      }),
    on(ActionsOffer.setOfferFilterNameAction,
      (state: OfferState, {offerFilterName}) => {
      return {
        ...state,
      filterName: offerFilterName
      };
      }),
    on(ActionsOffer.setPaginatedRequestListAction,
      (state: OfferState, {paginatedList}) => {
      return {
        ...state,
        paginatedRequestList: paginatedList
      };
      }),
    on(ActionsOffer.setPaginatorEventAction,
      (state: OfferState, {paginatorEvent, filterName}) => {
      return {
        ...state,
        paginatorEvents: {
          ...state.paginatorEvents,
          [filterName]: paginatorEvent
        }
      };
      }),
    on(ActionsOffer.mobailFilterToggleAction,
      (state: OfferState ) => {
      return {
        ...state,
        mobileFilterOpened: !state.mobileFilterOpened,
      };
      }),
);

export function offerReducer(state, action) {
	return _offerReducer(state, action);
}