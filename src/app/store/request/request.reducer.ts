import { Action, createReducer, on } from '@ngrx/store';
import { Request, RequestFilterName } from 'src/app/models/request.model';
import * as ActionsRequest from './request.actions';

export const requestFeatureKey = 'request';

export interface RequestState {
isLoading: boolean;
isOpenedOfferList: boolean;
changedRequest: Request;
requestList: Request[];
filteredRequestList: Request[];
filterName: string;
}

export const initialStateRequest: RequestState = {
  isLoading: false,
  changedRequest: null,
  isOpenedOfferList: false,

  requestList: [],
  filteredRequestList: [],
  filterName: RequestFilterName[1]
};


export const _requestReducer = createReducer(
  initialStateRequest,
  on(ActionsRequest.requestInProgressAction,
    (state: RequestState) => {
    return {
      ...state,
      isLoading: !state.isLoading
    };
    }),
    on(ActionsRequest.createRequestAction,
      (state: RequestState, { request }) => {
      return {
        ...state,
        requestList: [
          ...state.requestList,
          {...request}
        ]
      };
      }),
    on(ActionsRequest.setFilteredRequestListAction,
      (state: RequestState, { requests }) => {
      return {
        ...state,
        filteredRequestList: [
          ...requests
        ]
      };
      }),
      on(ActionsRequest.initChangeRequestAction,
        (state: RequestState, { request }) => {
        return {
          ...state,
          changedRequest: request
        };
        }),
        on(ActionsRequest.endChangeRequestAction,
          (state: RequestState) => {
          return {
            ...state,
            changedRequest: null
          };
          }),
      on(ActionsRequest.loadRequestListFromDBAction,
        (state: RequestState, { requests }) => {
        return {
          ...state,
          requestList: [
            ...requests
          ]
        };
        }),
        on(ActionsRequest.loadInitialStateAction,
          (state: RequestState) => {
          return {
            ...state,
            requestList: []
          };
          }),
  on(ActionsRequest.offerListOpenAction,
    (state: RequestState) => {
    return {
      ...state,
      isOpenedOfferList: true
    };
    }),
  on(ActionsRequest.offerListCloseAction,
    (state: RequestState) => {
    return {
      ...state,
      isOpenedOfferList: false
    };
    }),
  on(ActionsRequest.setRequestFilterNameAction,
    (state: RequestState, {requestFilterName}) => {
    return {
      ...state,
      filterName: requestFilterName
    };
    }),
);

export function requestReducer(state, action) {
	return _requestReducer(state, action);
}