import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { screenWidthSelector, screenWidthAction, scrollTopSelector, scrollTopAction, moduleOpenedSelector, nowIsOfferbookModuleAction, nowIsLoginModuleAction } from '.';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {

  constructor(
		private _store$: Store,
  ) { }

  public get screenWidth$(): Observable<number> {
		return this._store$.pipe(select(screenWidthSelector));
  }
  public get scrollTop$(): Observable<number> {
		return this._store$.pipe(select(scrollTopSelector));
  }
  public get moduleOpened$(): Observable<string> {
		return this._store$.pipe(select(moduleOpenedSelector));
  }

  public setScreenWidth(screenWidth: number): void {
		this._store$.dispatch(screenWidthAction({screenWidth}));
  }
  public setScrollTop(scrollTop: number): void {
		this._store$.dispatch(scrollTopAction({scrollTop}));
  }
  public setOfferbookModuleOpened(): void {
		this._store$.dispatch(nowIsOfferbookModuleAction());
  }
  public setLoginModuleOpened(): void {
		this._store$.dispatch(nowIsLoginModuleAction());
  }
}