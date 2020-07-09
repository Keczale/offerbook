import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { OfferState, offerIsLoadingSelector, filteredRequestListInOfferSelector, offerRequestListSelector, setFiltredRequestListAction, setOfferFilterNameAction, offerFilterNameSelector, paginatedRequestListSelector, setPaginatedRequestListAction, paginatorEventsSelector, setPaginatorEventAction } from '.';
import { Request } from 'src/app/models/request.model';

@Injectable({
  providedIn: 'root'
})
export class OfferFacade {

  constructor(
    private _store$: Store<OfferState>,
  ) { }

  public get isLoading(): Observable<boolean> {
    return this._store$.pipe(select(offerIsLoadingSelector));
    }
  public get filteredRequestList$(): Observable<Request[]> {
    return this._store$.pipe(select(filteredRequestListInOfferSelector));
    }
  public get offerRequestList$(): Observable<Request[]> {
    return this._store$.pipe(select(offerRequestListSelector));
    }
  public get paginatedRequestList$(): Observable<Request[]> {
    return this._store$.pipe(select(paginatedRequestListSelector));
    }
  public get paginatorEvent$(): Observable<object> {
    return this._store$.pipe(select(paginatorEventsSelector));
    }
  public get offerFilterName$(): Observable<string> {
    return this._store$.pipe(select(offerFilterNameSelector));
    }

  public setFilteredRequestList(filteredList: Request[]): void {
    this._store$.dispatch(setFiltredRequestListAction({filteredList}));
  }
  public setOfferFilterName(offerFilterName: string): void {
    this._store$.dispatch(setOfferFilterNameAction({offerFilterName}));
  }
  public setPaginatedRequestList(paginatedList: Request[]): void {
    this._store$.dispatch(setPaginatedRequestListAction({paginatedList}));
  }
  public setPaginatorEvent(paginatorEvent: object, filterName: string): void {
    this._store$.dispatch(setPaginatorEventAction({paginatorEvent, filterName}));
  }
    
}
