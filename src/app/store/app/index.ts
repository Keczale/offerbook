import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '..';
import { appFeatureKey } from './app.reducer';

export * from './app.reducer';
export * from './app.actions';
export * from './app.selectors';

export const appFeatureSelector = createFeatureSelector<AppState>(appFeatureKey);
