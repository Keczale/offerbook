import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Request } from 'src/app/models/request.model';

import { loadInitialStateAction } from 'src/app/store';
import { loadActualRequestListFromDBAction } from 'src/app/store/offer';


@Injectable({
  providedIn: 'root'
})
export class OfferDataService {

  constructor(
    private _store$: Store,
  ) { }
  public requestMapBaseURL: string = '/requests/map';

 

  public loadActualListFromDB(): void {
    firebase.database().ref(`${this.requestMapBaseURL}`).once('value')
    .then((snap: any) => snap.val())
    .then((requestMap) =>
    { if (requestMap) {
      const activeRequestList: Request[] = Object.values(requestMap);
      this._store$.dispatch(loadActualRequestListFromDBAction({requests: activeRequestList}))
      }
    else {
      // const arr: string[] = [''];
      this._store$.dispatch(loadInitialStateAction())}
    });
  }

}
