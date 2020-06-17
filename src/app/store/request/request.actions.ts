import { createAction, props } from '@ngrx/store';

export const loadRequests = createAction(
  '[Request] Load Requests'
);

export const loadRequestsSuccess = createAction(
  '[Request] Load Requests Success',
  props<{ data: any }>()
);

export const loadRequestsFailure = createAction(
  '[Request] Load Requests Failure',
  props<{ error: any }>()
);
