import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { OfferState, offerIsLoadingSelector } from '.';

@Injectable({
  providedIn: 'root'
})
export class OfferFacade {

  constructor(
    private _store$: Store<OfferState>,
  ) { }

  public get isLoading(): Observable<boolean>{
    return this._store$.pipe(select(offerIsLoadingSelector));
    }

    
}
