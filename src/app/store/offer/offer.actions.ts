import { createAction, props } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';


export const offerInProgressAction = createAction(
  '[Offer] Activate/disactivate load bar'
);


export const loadActualRequestListFromDBAction = createAction(
  '[Offer] Load buyer requests from data base for seller',
  props<{ requests: Request[] }>()
);

export const loadOffersSuccess = createAction(
  '[Offer] Load Offers Success',
  props<{ data: any }>()
);

export const loadOffersFailure = createAction(
  '[Offer] Load Offers Failure',
  props<{ error: any }>()
);
