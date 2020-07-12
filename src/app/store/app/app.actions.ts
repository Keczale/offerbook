import { createAction, props } from '@ngrx/store';

export const screenWidthAction = createAction(
  '[App] Set screen width',
  props<{ screenWidth: number }>()
);

export const loadAppsSuccess = createAction(
  '[App] Load Apps Success',
  props<{ data: any }>()
);

export const loadAppsFailure = createAction(
  '[App] Load Apps Failure',
  props<{ error: any }>()
);
