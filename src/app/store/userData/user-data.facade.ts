import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState, DataIsLoadingSelector, currentUserNameSelector, logOutErrorSelector, userTypeSelector } from '.';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/features/user/services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataFacade {

  constructor(
	private _store$: Store<UserState>,
	private _userDataService: UserDataService
  ) { }

  public get isLoading(): Observable<boolean>{
	return this._store$.pipe(select(DataIsLoadingSelector));
  }
  public get userName(): Observable<string>{
	return this._store$.pipe(select(currentUserNameSelector));
  }
  public get logOutError(): Observable<string>{
	return this._store$.pipe(select(logOutErrorSelector));
  }
  public get userType(): Observable<string>{
    return this._store$.pipe(select(userTypeSelector));
    }

  public loadCurrentUserFromDB(uid: string): void {
	this._userDataService.loadCurrentUserFromData(uid);
  }
  public userSignOut(): void {
	this._userDataService.signOut();
}

}
