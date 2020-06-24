import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RequestState, requestIsLoadingSelector, requestChangeSelector } from '.';
import { Observable } from 'rxjs';
import { Request } from 'src/app/models/request.model';


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
  public get changedRequest$(): Observable<Request>{
    return this._store$.pipe(select(requestChangeSelector))
  }

}
