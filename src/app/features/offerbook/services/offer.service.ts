import { Injectable } from '@angular/core';
import { OfferDataService } from './offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Request } from 'src/app/models/request.model';
import { Store, select } from '@ngrx/store';
import { loadActualRequestListFromDBAction, offerRequestListSelector } from 'src/app/store/offer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private _offerDataService: OfferDataService,
    private _userFacade: UserDataFacade,
    private _store$: Store,

  ) { }

  public get actualRequest$(): Observable<Request[]>{
    return this._store$.pipe(select(offerRequestListSelector))
  }

  public loadBuyerInfo(uid: string): Promise<User>{
    return this._offerDataService.loadBuyerInfo(uid)
  }

  public loadActualList(user: User): void {
    if(user.sellerLocation, user.sellerCategories){
      this._offerDataService.loadActualListFromDB(user.sellerLocation, user.sellerCategories)
      .then(async(requestList: Request[]) => {
        await this._offerDataService.loadUserRequests(user.id)
        .then((userIdList: string[]) => {console.log(userIdList);
         return requestList.filter((request: Request) => !userIdList.includes(request.id)); })
        .then((requests: Request[]) =>
        {this._store$.dispatch(loadActualRequestListFromDBAction({ requests: requests }));
      });
      });
    }
  }
}
