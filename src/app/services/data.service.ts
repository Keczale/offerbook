import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState, inProgressAction, DataIsLoadingSelector } from '../store';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	public isLoading: boolean;

	constructor(
	private _store$: Store<UserState>

  ) { }

  public loading(): void {
	this._store$.dispatch(inProgressAction());
	this._store$.pipe(select(DataIsLoadingSelector)).subscribe(boo => this.isLoading = boo);
  }
}
