import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { UserState, DataIsLoadingSelector, currentUserNameSelector, logOutErrorSelector, userTypeSelector, userLocationSelector, currentUserSelector, setRejectedRequestAction, sellerLocationSelector, sellerCategoriesSelector, setResponsedRequestAction, lastOffersSelector, setLastOfferToRequestsAction } from '.';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/features/user/services/user-data.service';
import { User, LastOffer } from 'src/app/models/user.model';

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
  public get userName(): Observable<string> {
	return this._store$.pipe(select(currentUserNameSelector));
  }
  public get logOutError(): Observable<string> {
	return this._store$.pipe(select(logOutErrorSelector));
  }
  public get userType(): Observable<string> {
    return this._store$.pipe(select(userTypeSelector));
    }
  public get userLocation$(): Observable<string> {
    return this._store$.pipe(select(userLocationSelector));
    }
  public get currentUser$(): Observable<User> {
    return this._store$.pipe(select(currentUserSelector));
    }
  public get sellerLocation$(): Observable<string[]> {
    return this._store$.pipe(select(sellerLocationSelector));
    }
  public get sellerCategory$(): Observable<string[]> {
    return this._store$.pipe(select(sellerCategoriesSelector));
    }
  public get lastOffers$(): Observable<object[]> {
    return this._store$.pipe(select(lastOffersSelector));
    }

    public setRejectedRequest(id: string): void {
      this._store$.dispatch(setRejectedRequestAction({rejected: id}));
    }  
  public setLastOfferToRequestsAction(lastOfferList: LastOffer[]): void {
    this._store$.dispatch(setLastOfferToRequestsAction({newLastOfferList: lastOfferList}));
  }
  public setResponsedRequest(id: string): void {
    this._store$.dispatch(setResponsedRequestAction({responsed: id}));
  }

  public userToDataBase(): void {
    this._userDataService.userToDataBaseReg();
  }

  public loadCurrentUserFromDB(uid: string): void {
	this._userDataService.loadCurrentUserFromData(uid);
  }
  public userSignOut(): void {
	this._userDataService.signOut();
}

}
