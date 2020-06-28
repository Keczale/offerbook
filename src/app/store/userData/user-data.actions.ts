import { createAction, props } from '@ngrx/store';

// export enum dataActionType {
//   loadFromLocalStorage = '[UserData] Activate/disactivate load bar',
// }

export const inProgressAction = createAction(
  '[UserData] Activate/disactivate load bar'
);

export const loadCurrentUserAction = createAction(
  '[UserData] Load current user from database',
  props<{ id: string, name: string, email: string,
     userType: string, sellerCategories: string[],
     sellerLocation: string[], userLocation: string}>()
);
export const getCurrentUserAction = createAction(
  '[UserData] Get current user from database',
  props<{ id: string, name: string, email: string}>()
);

export const setUserLocationAction = createAction(
  '[UserData] Set current user location',
  props<{ userLocation: string}>()
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

export const getLogOutErrorAction = createAction(
  '[UserData] Get error in log out',
  props<{ logOutError: string}>()
);

export const cleanLogOutErrorAction = createAction(
  '[UserData] Clean error in log out'
);

export const addSellerAction = createAction(
  '[UserData] add status seller to current user'
);
export const removeSellerAction = createAction(
  '[UserData] remove status seller to current user'
);
export const setSellerCategoriesAction = createAction(
  '[UserData] set seller categories  to current user',
  props<{ sellerCategories: string[]}>()
);
export const setSellerLocationAction = createAction(
  '[UserData] set seller cities  to current user',
  props<{ sellerCities: string[]}>()
);
