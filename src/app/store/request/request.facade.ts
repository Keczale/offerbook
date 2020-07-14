import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RequestState, requestIsLoadingSelector, requestChangeSelector, requestListSelector, isOpenedOfferListSelector, offerListOpenAction, offerListCloseAction, filteredRequestListSelector, setFilteredRequestListAction, requestFilterNameSelector, setRequestFilterNameAction, listIsEmptySelector, setEmptyListAction, removeEmptyListAction, filterToggleAction, requestFilterOpenedSelector } from '.';
import { Observable } from 'rxjs';
import { Request } from 'src/app/models/request.model';


@Injectable({
  providedIn: 'root'
})
export class RequestFacade {

  constructor(
    private _store$: Store<RequestState>,
  ) { }

  public get isLoading(): Observable<boolean> {
    return this._store$.pipe(select(requestIsLoadingSelector));
    }
  public get changedRequest$(): Observable<Request> {
    return this._store$.pipe(select(requestChangeSelector));
  }
  public get requestList$(): Observable<Request[]> {
    return this._store$.pipe(select(requestListSelector));
  }
  public get filteredRequestList$(): Observable<Request[]> {
    return this._store$.pipe(select(filteredRequestListSelector));
  }
  public get isOpenedOfferList$(): Observable<boolean> {
    return this._store$.pipe(select(isOpenedOfferListSelector));
  }
  public get requestFilterName$(): Observable<string> {
    return this._store$.pipe(select(requestFilterNameSelector));
  }
  public get listIsEmpty$(): Observable<boolean> {
    return this._store$.pipe(select(listIsEmptySelector));
  }
  public get filterOpened$(): Observable<boolean> {
    return this._store$.pipe(select(requestFilterOpenedSelector));
  }
  public openOfferList(): void {
    this._store$.dispatch(offerListOpenAction());
  }
  public closeOfferList(): void {
    this._store$.dispatch(offerListCloseAction());
  }
  public setFilteredRequestList(requests: Request[]): void {
    this._store$.dispatch(setFilteredRequestListAction({requests}));
  }
  public setRequestFilterName(requestFilterName: string): void {
    this._store$.dispatch(setRequestFilterNameAction({requestFilterName}));
  }
  public setListIsEmpty(): void {
    this._store$.dispatch(setEmptyListAction());
  }
  public removeListIsEmpty(): void {
    this._store$.dispatch(removeEmptyListAction());
  }
  public mobileFilterToggle(): void {
    this._store$.dispatch(filterToggleAction());
  }
}
