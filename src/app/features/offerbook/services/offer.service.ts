import { Injectable } from '@angular/core';
import { OfferDataService } from './offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private _offerDataService: OfferDataService,
    private _userFacade: UserDataFacade,

  ) { } 

  public loadActualList(): void{

		this._offerDataService.loadActualListFromDB();
	}


}
