import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { screenWidthSelector, screenWidthAction, scrollTopSelector, scrollTopAction } from '.';

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

  public setScreenWidth(screenWidth: number): void {
		this._store$.dispatch(screenWidthAction({screenWidth}));
  }
  public setScrollTop(scrollTop: number): void {
		this._store$.dispatch(scrollTopAction({scrollTop}));
  }
}