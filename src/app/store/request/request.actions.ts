import { createAction, props } from '@ngrx/store';
import { Request } from '../../models/request.model';

export const requestInProgressAction = createAction(
  '[Request] Activate/disactivate load bar'
);

export const loadInitialStateAction = createAction(
  '[Request] load initial state requests'
);

export const createRequestAction = createAction(
  '[Request] Create buyer request',
  props<{ request: Request }>()
);
export const initChangeRequestAction = createAction(
  '[Request] Init changging request',
  props<{ request: Request }>()
);
export const endChangeRequestAction = createAction(
  '[Request] End changging request',
);

export const loadRequestListFromDBAction = createAction(
  '[Request] Load buyer request from data base',
  props<{ requests: Request[] }>()
);