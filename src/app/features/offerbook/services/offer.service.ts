import { Injectable } from '@angular/core';
import { OfferDataService } from './offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Request } from 'src/app/models/request.model';
import { Store } from '@ngrx/store';
import { loadActualRequestListFromDBAction } from 'src/app/store/offer';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private _offerDataService: OfferDataService,
    private _userFacade: UserDataFacade,
    private _store$: Store,

  ) { }

  public loadActualList(user: User): void {
    if(user.sellerLocation, user.sellerCategories){
      this._offerDataService.loadActualListFromDB(user.sellerLocation, user.sellerCategories)
      .then((requestList: Request[]) => {
        console.log(requestList)
        this._store$.dispatch(loadActualRequestListFromDBAction({ requests: requestList }))

      });}
  }


}
