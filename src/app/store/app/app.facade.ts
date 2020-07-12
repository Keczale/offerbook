import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { screenWidthSelector, screenWidthAction } from '.';

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

  public setScreenWidth(screenWidth: number): void {
		this._store$.dispatch(screenWidthAction({screenWidth}));
  }
}