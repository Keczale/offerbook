import { userDataFeatureKey, UserState, userDataReducer } from './userData';
import { ActionReducerMap, Action } from '@ngrx/store';
import { requestFeatureKey, requestReducer, RequestState } from './request';

export * from './userData';
export * from './request';

export interface AppState {
	[userDataFeatureKey]: UserState;
	[requestFeatureKey]: RequestState;
}

export const redusers: ActionReducerMap<AppState, Action> = {
	[userDataFeatureKey]: userDataReducer,
	[requestFeatureKey]: requestReducer
};

