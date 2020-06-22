import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestState, requestFeatureKey } from './request.reducer';

export const requestFeatureSelector = createFeatureSelector<RequestState>(requestFeatureKey);

// tslint:disable-next-line: typedef
export const requestStateSelector = createSelector(
	requestFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state
);
export const requestIsLoadingSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.isLoading
);
export const requestListSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.requestList
);
