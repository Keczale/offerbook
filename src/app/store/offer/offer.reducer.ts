import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsOffer from './offer.actions';
import { Request } from 'src/app/models/request.model';
import { Offer } from 'src/app/models/offer.model';


export const offerFeatureKey = 'offer';

export interface OfferState {
isLoading: boolean;
requestListIsChanging: boolean;
newRequestCount: number;
openedRequest: Request;
requestList: Request[];
}

export const initialOfferState: OfferState = {
  isLoading: false,
  requestListIsChanging: false,
  newRequestCount: null,
  openedRequest: null,
  requestList: []
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
    on(ActionsOffer.setRequestToAnswer,
      (state: OfferState, { request }) => {
      return {
        ...state,
      openedRequest: request
      };
      }),
    on(ActionsOffer.closeRequestToAnswer,
      (state: OfferState) => {
      return {
        ...state,
      openedRequest : null
      };
      }),
    
);

export function offerReducer(state, action) {
	return _offerReducer(state, action);
}