import { Action, createReducer, on } from '@ngrx/store';
import * as ActionsApp from './app.actions';
import { Modules } from 'src/app/models/common';



export const appFeatureKey = 'app';

export interface AppState {
screenWidth: number;
scrollTop: number;
moduleOpened: string;
}

export const initialState: AppState = {
  screenWidth: null,
  scrollTop: null,
  moduleOpened: Modules[1],
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
on(ActionsApp.nowIsLoginModuleAction,
	(state: AppState) => {
	return {
		...state,
		moduleOpened: Modules[0],
	};
	}),
on(ActionsApp.nowIsOfferbookModuleAction,
	(state: AppState) => {
	return {
		...state,
		moduleOpened: Modules[1],
	};
	}),

);

export function appReducer (state, action) {
	return _appReducer(state, action);
}
