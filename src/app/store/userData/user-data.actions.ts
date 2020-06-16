import { createAction, props } from '@ngrx/store';

// export enum dataActionType {
//   loadFromLocalStorage = '[UserData] Activate/disactivate load bar',
// }

export const inProgressAction = createAction(
  '[UserData] Activate/disactivate load bar'
);

export const getCurrentUserAction = createAction(
  '[UserData] Get current user',
  props<{ id: string, name: string, email: string}>()
);

export const userSignOutAction = createAction(
  '[UserData] User sign up'
  );

export const getCurrentUsderAction = createAction(
    '[UserData] Get current user',
    props<{ id: string, name: string, email: string}>()
  );  
