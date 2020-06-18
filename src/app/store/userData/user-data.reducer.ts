import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as ActionsUser from './user-data.actions';

export const userDataFeatureKey = 'userData';

export interface UserState {
  isLoading: boolean;
  emailError: string;
  logOutError: string;
  currentUser: User;
}

export const initialState: UserState = {
  isLoading: false,
  emailError: null,
  logOutError: null,
  currentUser: {
	id: null,
	userName: null, // сделать верификацию на уник
	email: null,
	location: {country: null, city: null},
	userData: {name: null, surname: null, birthDay: null},
	userStatus: null, // registered or guest если гость,
	userType: 'buyer', // byer seller or universal
	userRequests: [], // order id's
	userOffers: [], // offer id's
	sellersCategory: [],
	userRating: {buyer: null, seller: null}

  }
};


const _userDataReducer = createReducer(
	initialState,
	on(ActionsUser.inProgressAction,
	(state: UserState) => {
	return {
		...state,
		isLoading: !state.isLoading
	};
	}),
	on(ActionsUser.loadCurrentUserAction,
		(state: UserState, { id, name, email, userType }) => {
		return {
			...state,
			currentUser: {
				...state.currentUser,
				id: id,
				userName: name,
				email: email,
				userType: userType}
		};
	}
),
on(ActionsUser.getCurrentUserAction,
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
on (ActionsUser.userSignOutAction,
	(state: UserState) => {
	return {
		...state,
		currentUser: {...initialState.currentUser}
	};
}),
// on (loadStateFromDataAction,
// 	(state: UserState,{id, name, email}) => {
// 	return {
// 		...state,
// 		currentUser: {
// 			...state.currentUser,
// 			id: id,
// 			userName: name,
// 			email: email}
// 	};
// }),
on (ActionsUser.getEmailErrorLoginAction,
	(state: UserState, {emailError}) => {
	return {
		...state,
		emailError: emailError
	};
}),
on (ActionsUser.cleanEmailErrorLoginAction,
	(state: UserState) => {
	return {
		...state,
		emailError: null
	};
}),
on (ActionsUser.getLogOutErrorAction,
	(state: UserState, {logOutError}) => {
	return {
		...state,
		logOutError: logOutError
	};
}),
on (ActionsUser.cleanLogOutErrorAction,
	(state: UserState) => {
	return {
		...state,
		logOutError: null
	};
}),
on (ActionsUser.addSellerAction,
	(state: UserState) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			userType: 'seller'}
	};
}),
on (ActionsUser.removeSellerAction,
	(state: UserState) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			userType: 'buyer'}
	};
}),
on (ActionsUser.setSellerCategoriesAction,
	(state: UserState, {sellerCategories}) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			sellersCategory: sellerCategories}
	};
})
);
export function userDataReducer(state, action) {
	return _userDataReducer(state, action);
}
