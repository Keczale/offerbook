import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsApp from './app.actions';



export const appFeatureKey = 'app';

export interface AppState {
screenWidth: number;
}

export const initialState: AppState = {
  screenWidth: null,
};


export const _appReducer = createReducer(
  initialState,
  on(ActionsApp.screenWidthAction,
		(state: AppState, { screenWidth }) => {
		return {
			...state,
			screenWidth
		};
		}),

);

export function appReducer (state, action) {
	return _appReducer(state, action);
}
