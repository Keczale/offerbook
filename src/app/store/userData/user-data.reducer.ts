import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const userDataFeatureKey: string = 'userData';

export interface UserState {
  user: User;
  guest: boolean;
}

export const initialState: UserState = {
user: null,
guest: true,
};


export const reducer = createReducer(
  initialState,

);

