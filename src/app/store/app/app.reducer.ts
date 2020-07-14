import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsApp from './app.actions';



export const appFeatureKey = 'app';

export interface AppState {
screenWidth: number;
scrollTop: number;
}

export const initialState: AppState = {
  screenWidth: null,
  scrollTop: null,
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
	on(ActionsApp.scrollTopAction,
		(state: AppState, { scrollTop }) => {
		return {
			...state,
			scrollTop
		};
		}),
	

);

export function appReducer (state, action) {
	return _appReducer(state, action);
}
