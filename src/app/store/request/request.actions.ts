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
export const offerListOpenAction = createAction(
  '[Request] Open offerList component in currentRequest',
);
export const offerListCloseAction = createAction(
  '[Request] Close offerList component in currentRequest',
);

export const loadRequestListFromDBAction = createAction(
  '[Request] Load request list from data base',
  props<{ requests: Request[] }>()
);
export const setFilteredRequestListAction = createAction(
  '[Request] Set filtered Request List',
  props<{ requests: Request[] }>()
);
export const setRequestFilterNameAction = createAction(
  '[Request] Set request filter name',
  props<{ requestFilterName: string }>()
);
export const setEmptyListAction = createAction(
  '[Request] Set list as empty',
);
export const removeEmptyListAction = createAction(
  '[Request] Set list not empty',
);
export const filterToggleAction = createAction(
  '[Request] mobile filter toggle',
);