import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, appFeatureKey } from './app.reducer';

export const appFeatureSelector = createFeatureSelector<AppState>(appFeatureKey);

export const appStateSelector = createSelector(
	appFeatureSelector,
	// tslint:disable-next-line: typedef
	state => state
);
export const screenWidthSelector = createSelector(
	appStateSelector,
	// tslint:disable-next-line: typedef
	state => state.screenWidth
);
export const scrollTopSelector = createSelector(
	appStateSelector,
	// tslint:disable-next-line: typedef
	state => state.scrollTop
);
export const moduleOpenedSelector = createSelector(
	appStateSelector,
	// tslint:disable-next-line: typedef
	state => state.moduleOpened
);