import { createAction, props } from '@ngrx/store';

export const loadUserDatas = createAction(
  '[UserData] Load UserDatas'
);

export const loadUserDatasSuccess = createAction(
  '[UserData] Load UserDatas Success',
  props<{ data: any }>()
);

export const loadUserDatasFailure = createAction(
  '[UserData] Load UserDatas Failure',
  props<{ error: any }>()
);
