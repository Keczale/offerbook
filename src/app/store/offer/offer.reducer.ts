import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsOffer from './offer.actions';
import { Request } from 'src/app/models/request.model';


export const offerFeatureKey = 'offer';

export interface OfferState {
isLoading: boolean;
requestList: Request[]
}

export const initialOfferState: OfferState = {
  isLoading: false,
  requestList: []
};


export const reducer = createReducer(
  initialOfferState,
  on(ActionsOffer.offerInProgressAction,
    (state: OfferState) => {
    return {
      ...state,
      isLoading: !state.isLoading
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
    
);

