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
