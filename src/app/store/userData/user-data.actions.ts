import { createAction, props } from '@ngrx/store';

// export enum dataActionType {
//   loadFromLocalStorage = '[UserData] Activate/disactivate load bar',
// }

export const inProgressAction = createAction(
  '[UserData] Activate/disactivate load bar'
);

export const loadUserDatasSuccess = createAction(
  '[UserData] Load UserDatas Success',
  props<{ data: any }>()
);

