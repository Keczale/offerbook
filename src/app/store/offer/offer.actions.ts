import { createAction, props } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';


export const offerInProgressAction = createAction(
  '[Offer] Activate/disactivate load bar'
);

export const requestListIsChangingAction = createAction(
  '[Offer] Activate status changing request list'
);
export const requestListNotChangingAction = createAction(
  '[Offer] Disactivate status changing request list'
);

export const loadActualRequestListFromDBAction = createAction(
  '[Offer] Load buyer requests from data base for seller',
  props<{ requests: Request[] }>()
);

export const setNewRequestCounterAction = createAction(
  '[Offer] Set count of new actual requests for seller',
  props<{ count: number }>()
);

export const setRequestToAnswer = createAction(
  '[Offer] Set request to give offer',
  props<{ request: Request }>()
);

export const closeRequestToAnswer = createAction(
  '[Offer] clear request after offer',
);
