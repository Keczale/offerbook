import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { inProgressAction, getCurrentUserAction, userSignOutAction } from './user-data.actions';

export const userDataFeatureKey = 'userData';

export interface UserState {
  isLoading: boolean;
  currentUser: User;
}

export const initialState: UserState = {
  isLoading: false,
  currentUser: {
	id: null,
	userName: null, // сделать верификацию на уник
	email: null,
	location: {country: null, city: null},
	userData: {name: null, surname: null, birthDay: null},
	userStatus: null, // registered or guest если гость,
	userType: 'buyer', // byer seller or universal
	userOrders: [], // order id's
	userOffers: [], // offer id's
	sellersCategory: [],
	userRating: {buyer: null, seller: null}

  }
};


const _userDataReducer = createReducer(
	initialState,
	on(inProgressAction,
	(state: UserState) => {
	return {
		...state,
		isLoading: !state.isLoading
	};
	}),
	on(getCurrentUserAction,
		(state: UserState, { id, name, email }) => {
		return {
			...state,
			currentUser: {
				...state.currentUser,
				id: id,
				userName: name,
				email: email}
		};
	}
),
on (userSignOutAction,
	(state: UserState) => {
	return {
		...state,
		currentUser: {...initialState.currentUser}
	};
})
);
export function userDataReducer(state, action) {
	return _userDataReducer(state, action);
}
