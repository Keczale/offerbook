import { Injectable } from '@angular/core';
import { OfferDataService } from './offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Request } from 'src/app/models/request.model';
import { Store, select } from '@ngrx/store';
import { loadActualRequestListFromDBAction, offerRequestListSelector, offerInProgressAction, requestListIsChangingSelector, requestListIsChangingAction, requestListNotChangingAction, setNewRequestCounterAction, sellersNewRequestCountSelector, openedRequestSelector, setRequestToAnswer } from 'src/app/store/offer';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setLastLoadedRequestAction, currentUserSelector } from 'src/app/store';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private _idPrefficsEnd: number = 2;
	private _idPrefficsStart: number = 6;
  private _PhotoNamePrefficsStart: number = 6;
  private _timeOutForReject: number = 500;
  private _fileNameEndCut: number = 4;

  constructor(
    private _offerDataService: OfferDataService,
    private _userFacade: UserDataFacade,
    private _store$: Store,
    private _snackBar: MatSnackBar

  ) { }

    private get autoKey(): string {
    return (this._dateStamp().slice(this._dateStamp.length - this._idPrefficsStart, this._dateStamp().length)) +
    this._offerDataService.userUid.slice(0, this._idPrefficsEnd); }
  
    // private get _dateCreating(): Date {
    //   return new Date();
    // }
    private _dateStamp(): string {
      return (Date.now()).toString();
    }


  public get actualRequest$(): Observable<Request[]> {
    return this._store$.pipe(select(offerRequestListSelector));
  }
  public get IsRequestListChanging$(): Observable<boolean> {
    return this._store$.pipe(select(requestListIsChangingSelector));
  }
  public get getOpenedRequest$(): Observable<Request> {
    return this._store$.pipe(select(openedRequestSelector));
  }

  public get SellersRequestCount$(): Observable<number> {
    return this._store$.pipe(select(sellersNewRequestCountSelector));
  }

  public loadBuyerInfo(uid: string): Promise<User> {
    return this._offerDataService.loadBuyerInfo(uid);
  }

  public loadActualList(user: User): void {
    this._store$.dispatch(offerInProgressAction());
    if(user.sellerLocation, user.sellerCategories) {
      this._offerDataService.loadActualListFromDB(user.sellerLocation, user.sellerCategories)
      .then(async(requestList: Request[]) => {
        
        await this._offerDataService.loadOwnRequests(user.id)
        .then((userRequestIdList: string[]) => {
          const rejectedRequests: string[] = Object.assign([], user.sellerRejectedRequests);
          const acceptedRequests: string[] = Object.assign([], user.sellerResponsedRequests);
          const unNeedableArr: string[] = [...userRequestIdList, ...rejectedRequests, ...acceptedRequests];
         return requestList.filter((request: Request) => !unNeedableArr.includes(request.id))
            .sort((a, b) => a.lastChange - b.lastChange).reverse(); })
        .then((requests: Request[]) => {
          console.log(requests)
          if(user.sellerLastLoadedRequest){
             let count: number = requests.findIndex((request: Request) =>
             request.id === user.sellerLastLoadedRequest);
             //console.log(count)
             if (count < 0) {count = 0;
              }
             this._store$.dispatch(setNewRequestCounterAction({ count }));
          }
          if (user.sellerLastLoadedRequest !== requests[0].id) {
            //console.log(2)
            this._store$.dispatch(setLastLoadedRequestAction({ requestId: requests[0].id }));
            this._userFacade.userToDataBase();
          }
        this._store$.dispatch(loadActualRequestListFromDBAction({ requests }));
          })
        .then(() => this._store$.dispatch(offerInProgressAction()))
        .catch((error: Error) => {console.log(error);
          this._store$.dispatch(offerInProgressAction());
        });
      });
    }
  }


  public setRequestListIsChanging(): void {
    this._store$.dispatch(requestListIsChangingAction());
  }
  
  public saveRejectedRequests(): void {
    this._store$.dispatch(offerInProgressAction());
    this._userFacade.userToDataBase();
    this._store$.dispatch(requestListNotChangingAction());
    setTimeout(() =>{ this._store$.dispatch(offerInProgressAction());
      this._snackBar.open('Запросы окончательно отклонены!', '', {
        duration: 1500,
      });
    }, this._timeOutForReject);
  }

  public setResponsedRequest(id: string): void {
    this._userFacade.setAcceptedRequest(id);
    this._userFacade.userToDataBase();
  }


  public setOpenedRequest(request: Request): void{
    this._store$.dispatch(setRequestToAnswer({request: request}))
  }

	public isEmpty (obj){
		for (let key in obj){
			return false
		}
		return true
	}

  public submitOfferForm (value: any): void {
    
    this._store$.dispatch(offerInProgressAction());
    
    const offerId: string = this.autoKey;
    const UserId: string = this._offerDataService.userUid;

    let fileName: string = '';
	let photoName: string = '';
	let file: File = null;

  if (value.requestImage){
    file = value.requestImage.files[0];
		fileName = file.name;
    photoName = `${this.autoKey}${fileName.slice(fileName.length - this._fileNameEndCut, fileName.length) }`;
	}

    let openedRequest: Request = null;
		this.getOpenedRequest$
		.subscribe((request: Request) => openedRequest = request).unsubscribe();

    let currentUser: User = null;
    this._userFacade.currentUser$.subscribe((user: User) => currentUser = user);

    let offer: Offer = new Offer();

		this._offerDataService.uploadOfferImage(file, photoName)
		.then((downloadPhotoURL: string) => {
			const dateCreateStamp: number = Date.now();
			offer = {
        ...offer,
      id: offerId,
      requestId: openedRequest.id,
      fromUserId: UserId,
      fromUserName: currentUser.userName,
      fromUserRating: !this.isEmpty(currentUser.userRating) && !this.isEmpty(currentUser.userRating.seller) ?
        currentUser.userRating.seller : null,
      title: openedRequest.title,
      description: value.description,
      conditions: value.conditions,
      category: openedRequest.category,
      secondHand: value.secondHand,
      price: value.price,
      photos: [downloadPhotoURL],
      photoNames: [photoName],
      dateCreating: dateCreateStamp,
      lastChange: dateCreateStamp,
      status: OfferStatus[0],
      };
    })
    .then(() => this._offerDataService.sendOfferToDatabase(offer, openedRequest.fromUser))
    .then(() => this.setResponsedRequest(openedRequest.id))
    .then(() => this._store$.dispatch(offerInProgressAction()))
    .then(() => this.refreshRequestList())
		// .then(() => this._requestDataService.addRequestToMap(userRequest.city, userRequest.category, userRequest.fromUser, userRequest.id))
		.catch((error: Error) => {
			this._store$.dispatch(offerInProgressAction());
			console.log(error);
			});

  }

  public refreshRequestList(): void {
    let currentUser: User = null;
    this._userFacade.currentUser$
    .pipe(take(1))
    .subscribe((user: User) => {
    currentUser = user;
    });
    this.loadActualList(currentUser);
  }

}
