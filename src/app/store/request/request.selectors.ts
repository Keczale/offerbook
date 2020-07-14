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
export const filteredRequestListSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.filteredRequestList
);
export const requestChangeSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.changedRequest
);
export const isOpenedOfferListSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.isOpenedOfferList
);
export const requestFilterNameSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.filterName
);
export const listIsEmptySelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.listIsEmpty
);
export const requestFilterOpenedSelector = createSelector(
	requestStateSelector,
	// tslint:disable-next-line: typedef
	state => state.mobileFilterOpened
);