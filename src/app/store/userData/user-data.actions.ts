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

// export const loadStateFromDataAction = createAction(
//   '[UserData] Load state from database',
//   props<{ id: string, name: string, email: string}>()
// );

export const getEmailErrorLoginAction = createAction(
  '[UserData] Get error in email login',
  props<{ emailError: string}>()
);
export const cleanEmailErrorLoginAction = createAction(
  '[UserData] Clean error in email login'
);
