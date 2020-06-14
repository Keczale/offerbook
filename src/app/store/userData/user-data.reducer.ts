import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { inProgressAction } from './user-data.actions';

export const userDataFeatureKey = 'userData';

export interface UserState {
  isLoading: boolean;
}

export const initialState: UserState = {
  isLoading: false
};


const _userDataReducer = createReducer(
  initialState,
  on(inProgressAction,
	state => {
	return {
		...state,
		isLoading: !state.isLoading
	};
	}
));
export function userDataReducer(state, action) {
	return _userDataReducer(state, action);
}