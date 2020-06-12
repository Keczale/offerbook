import { userDataFeatureKey, UserState } from './userData';
import { ActionReducerMap } from '@ngrx/store';

export * from './userData';

export interface AppState{
	[userDataFeatureKey]: UserState;
}

export const redusers: ActionReducerMap<UserState> = {
	[userDataFeatureKey] : 'userStateReduser'
};
