import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RequestState, requestIsLoadingSelector } from '.';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestFacade {

  constructor(
    private _store$: Store<RequestState>,
  ) { }
  public get isLoading(): Observable<boolean>{
    return this._store$.pipe(select(requestIsLoadingSelector));
    }

}
