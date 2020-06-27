import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OfferState, offerFeatureKey } from './offer.reducer';

export const offerFeatureSelector = createFeatureSelector<OfferState>(offerFeatureKey);

// tslint:disable-next-line: typedef
export const offerStateSelector = createSelector(
	offerFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state
);