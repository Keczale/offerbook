import { createAction, props } from '@ngrx/store';

export const screenWidthAction = createAction(
  '[App] Set screen width',
  props<{ screenWidth: number }>()
);
export const scrollTopAction = createAction(
  '[App] Set scroll top',
  props<{ scrollTop: number }>()
);

export const nowIsLoginModuleAction = createAction(
  '[App] Login module opened',
);
export const nowIsOfferbookModuleAction = createAction(
  '[App] Offerbook module opened',
);