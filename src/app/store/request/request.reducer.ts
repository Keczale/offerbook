import { Action, createReducer, on } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';
import * as ActionsRequest from './request.actions';

export const requestFeatureKey = 'request';

export interface RequestState {
isLoading: boolean;
changedRequest: Request;
requestList: Request[];
}

export const initialStateRequest: RequestState = {
  isLoading: false,
  changedRequest: null,

  requestList: []
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
          })
);

export function requestReducer(state, action) {
	return _requestReducer(state, action);
}