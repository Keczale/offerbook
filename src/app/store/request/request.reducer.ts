import { Action, createReducer, on } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';
import * as ActionsRequest from './request.actions';

export const requestFeatureKey = 'request';

export interface RequestState {
isLoading: boolean;
requestList: Request[];
}

export const initialStateRequest: RequestState = {
  isLoading: false,
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
);

export function requestReducer(state, action) {
	return _requestReducer(state, action);
}