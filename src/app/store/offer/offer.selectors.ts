import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferState, offerFeatureKey } from './offer.reducer';

export const offerFeatureSelector = createFeatureSelector<OfferState>(offerFeatureKey);

// tslint:disable-next-line: typedef
export const offerStateSelector = createSelector(
	offerFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state
);
export const offerIsLoadingSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.isLoading
);
export const requestListIsChangingSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.requestListIsChanging
);
export const sellersNewRequestCountSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.newRequestCount
);

export const offerRequestListSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.requestList
);
export const openedRequestSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.openedRequest
);
export const filteredRequestListInOfferSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.filteredRequestList
);
export const offerFilterNameSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.filterName
);
export const paginatedRequestListSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.paginatedRequestList
);
export const paginatorEventsSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.paginatorEvents
);
export const mobileFilterOpenedSelector = createSelector(
	offerStateSelector,
	// tslint:disable-next-line: typedef
	state => state.mobileFilterOpened
);