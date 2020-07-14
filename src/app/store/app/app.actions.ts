import { createAction, props } from '@ngrx/store';

export const screenWidthAction = createAction(
  '[App] Set screen width',
  props<{ screenWidth: number }>()
);
export const scrollTopAction = createAction(
  '[App] Set scroll top',
  props<{ scrollTop: number }>()
);

