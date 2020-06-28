import { userDataFeatureKey, UserState, userDataReducer } from './userData';
import { ActionReducerMap, Action } from '@ngrx/store';
import { requestFeatureKey, requestReducer, RequestState } from './request';
import { offerFeatureKey, OfferState, offerReducer } from './offer';

export * from './userData';
export * from './request';
export * from './offer';

export interface AppState {
	[userDataFeatureKey]: UserState;
	[requestFeatureKey]: RequestState;
	[offerFeatureKey]: OfferState;

}

export const redusers: ActionReducerMap<AppState, Action> = {
	[userDataFeatureKey]: userDataReducer,
	[requestFeatureKey]: requestReducer,
	[offerFeatureKey]: offerReducer
};

