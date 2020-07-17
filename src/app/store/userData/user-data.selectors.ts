import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, userDataFeatureKey } from './user-data.reducer';


const userDataFeatureSelector = createFeatureSelector<UserState>(userDataFeatureKey);

// tslint:disable-next-line: typedef
const userDataStateSelector = createSelector(
	userDataFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state
);

export const DataIsLoadingSelector = createSelector(
	userDataFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state.isLoading
);
export const currentUserSelector = createSelector(
	userDataFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state.currentUser
);
export const currentUserNameSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.userName
);

export const emailErrorSelector = createSelector(
	userDataFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state.emailError
);
export const logOutErrorSelector = createSelector(
	userDataFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state.logOutError
);
export const userTypeSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.userType
);
export const userLocationSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.location
);
export const userDataSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.userData
);
export const lastOffersSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.requestsLastOffer
);

export const sellerCategoriesSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.sellerCategories
);
export const sellerLocationSelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.sellerLocation
);
