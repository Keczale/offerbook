import { createAction, props } from '@ngrx/store';
import { Request } from '../../models/request.model';

export const requestInProgressAction = createAction(
  '[Request] Activate/disactivate load bar'
);

export const createRequestAction = createAction(
  '[Request] Create buyer request',
  props<{ request: Request }>()
); 
