import { userDataFeatureKey, UserState, userDataReducer } from './userData';
import { ActionReducerMap, Action } from '@ngrx/store';

export * from './userData';

export interface AppState {
	[userDataFeatureKey]: UserState;
}

export const redusers: ActionReducerMap<AppState, Action> = {
	[userDataFeatureKey]: userDataReducer,
};
