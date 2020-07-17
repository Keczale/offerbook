import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as ActionsUser from './user-data.actions';

export const userDataFeatureKey = 'userData';

export interface UserState {
  isLoading: boolean;
  emailError: string;
  logOutError: string;
  buyerWindow: boolean;
  currentUser: User;
}

export const initialState: UserState = {
  isLoading: false,
  emailError: null,
  logOutError: null,
  buyerWindow: true,
  currentUser: {
	id: null,
	userName: null, // сделать верификацию на уник
	email: null,
	location: '',
	userData: null,
	userStatus: null, // registered or guest если гость,
	userType: 'buyer', // byer seller or universal
	userRequests: [null], // order id's
	requestsLastOffer: [],
	userOffers: [null], // offer id's
	sellerCategories: [null],
	sellerLocation: [null],
	sellerRejectedRequests: [null],
	sellerResponsedRequests: {
		requestId: ['1'],
		requestRef: [null]
	},
	sellerLastLoadedRequest: null,
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
		(state: UserState, { currentUser }) => {
		return {
			...state,
			currentUser: {
				...currentUser,
			}
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
on(ActionsUser.setLastLoadedRequestAction,
	(state: UserState, { requestId }) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			sellerLastLoadedRequest: requestId}
	};
}
),
on(ActionsUser.setRejectedRequestAction,
	(state: UserState, { rejected }) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			sellerRejectedRequests: [...Object.assign([],state.currentUser.sellerRejectedRequests), rejected]  }
	};
}
),
on(ActionsUser.setResponsedRequestAction,
	(state: UserState, { responsedRequestId, responsedRequestRef }) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			sellerResponsedRequests: {
				requestId: [...Object.assign([],state.currentUser.sellerResponsedRequests.requestId), responsedRequestId],
				requestRef:  [...Object.assign([],state.currentUser.sellerResponsedRequests.requestRef), responsedRequestRef]
			}
			}
	};
}
),
on(ActionsUser.setUserLocationAction,
	(state: UserState, { userLocation }) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			location: userLocation
		}
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
			sellerCategories: sellerCategories}
	};
}),
on (ActionsUser.setSellerLocationAction,
	(state: UserState, {sellerCities}) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			sellerLocation: sellerCities}
	};
}),
on (ActionsUser.setLastOfferToRequestsAction,
	(state: UserState, {newLastOfferList}) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			requestsLastOffer: newLastOfferList}
	};
}),
on (ActionsUser.setUserDataFromFormAction,
	(state: UserState, {userData}) => {
	return {
		...state,
		currentUser: {
			...state.currentUser,
			userData}
	};
}),
);


export function userDataReducer(state, action) {
	return _userDataReducer(state, action);
}
