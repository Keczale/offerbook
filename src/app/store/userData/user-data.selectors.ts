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

export const sellersCategorySelector = createSelector(
	currentUserSelector,
	// tslint:disable-next-line: typedef
	state => state.sellersCategory
);