import { Injectable } from '@angular/core';
import { OfferDataService } from './offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User, SellersResponsedRequests } from 'src/app/models/user.model';
import { Request } from 'src/app/models/request.model';
import { Store, select } from '@ngrx/store';
import { loadActualRequestListFromDBAction, offerInProgressAction, requestListIsChangingSelector, requestListIsChangingAction, requestListNotChangingAction, setNewRequestCounterAction, sellersNewRequestCountSelector, openedRequestSelector, setRequestToAnswerAction } from 'src/app/store/offer';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setLastLoadedRequestAction, currentUserSelector } from 'src/app/store';
import { Offer, OfferStatus, OfferFilterName } from 'src/app/models/offer.model';
import { take } from 'rxjs/operators';
import { OfferFacade } from 'src/app/store/offer/offer.facade';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private _idPrefficsEnd: number = 2;
	private _idPrefficsStart: number = 6;
  private _PhotoNamePrefficsStart: number = 6;
  private _timeOutForReject: number = 500;
  private _fileNameEndCut: number = 4;
  public currentUser: User = null;

  constructor(
    private _offerDataService: OfferDataService,
    private _userFacade: UserDataFacade,
    private _offerFacade: OfferFacade,
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


  // public get actualRequest$(): Observable<Request[]> {
  //   return this._store$.pipe(select(offerRequestListSelector));
  // }
  public get IsRequestListChanging$(): Observable<boolean> {
    return this._store$.pipe(select(requestListIsChangingSelector));
  }
  public get getOpenedRequest$(): Observable<Request> {
    return this._store$.pipe(select(openedRequestSelector));
  }

  public get SellersRequestCount$(): Observable<number> {
    return this._store$.pipe(select(sellersNewRequestCountSelector));
  }
  public requestFilterBySellersRequests(user: User, requestList: Request[], userRequestIdList: string[]): Request[] {
    // const rejectedRequests: string[] = Object.assign([], user.sellerRejectedRequests);
    // const acceptedRequests: string[] = Object.assign([], user.sellerResponsedRequests);
    const unwantedArr: string[] = [...userRequestIdList];
    const filteredList: Request[] = requestList.filter((request: Request) => !unwantedArr.includes(request.id));
   return this.requestSorterDownDate(filteredList);
  }
  public requestSorterDownDate(requestList: Request[]): Request[] {
    return requestList.sort((a: Request, b: Request) => a.lastChange - b.lastChange).reverse();
  }
  

  public loadBuyerInfo(uid: string): Promise<User> {
    return this._offerDataService.loadBuyerInfo(uid);
  }

  public loadActualList(user: User): void {
    this._store$.dispatch(offerInProgressAction());
    if (Boolean(user.sellerLocation) && Boolean(user.sellerCategories)) {
      this._offerDataService.loadActualListFromDB(user.sellerLocation, user.sellerCategories, user.sellerResponsedRequests)
      .then(async(requestList: Request[]) => {
        
        await this._offerDataService.loadOwnRequests(user.id)
        .then((userRequestIdList: string[]) => {
          return this.requestFilterBySellersRequests(user, requestList, userRequestIdList);
        })
        .then((requests: Request[]) => {
          if (Boolean(user.sellerLastLoadedRequest)) {
             let count: number = requests.findIndex((request: Request) =>
             request.id === user.sellerLastLoadedRequest);
             //console.log(count)
             if (count < 0) {count = 0;
              }
             this._store$.dispatch(setNewRequestCounterAction({ count }));
          }
          if (Boolean(requests[0]) && user.sellerLastLoadedRequest !== requests[0].id) {
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
    setTimeout(() => {this._store$.dispatch(offerInProgressAction());
      this._snackBar.open('Запросы окончательно отклонены!', '', {
        duration: 1500,
      });
    }, this._timeOutForReject);
  }

  public setResponsedRequest(responsedId: string, responsedRef: string): void {
    this._userFacade.setResponsedRequest(responsedId, responsedRef );
    this._userFacade.userToDataBase();
  }


  public setOpenedRequest(request: Request): void{
    this._store$.dispatch(setRequestToAnswerAction({request}));
  }

	public isEmpty (obj: any): boolean {
    if (obj) {
      for (let key in obj) {
        return false;
      }
    
    return true;
  }
	}

  public submitOfferForm (value: any): void {
    
    this._store$.dispatch(offerInProgressAction());
    
    const offerId: string = this.autoKey;
    const UserId: string = this._offerDataService.userUid;

    let fileName: string = '';
	let photoName: string = '';
	let file: File = null;

  if (value.requestImage) {
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
      fromUserRating: Boolean(currentUser.userRating) && Boolean(currentUser.userRating.seller) ?
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
    .then(() => this.setResponsedRequest(openedRequest.id, `${openedRequest.fromUser}/${openedRequest.id}`))

    .then(() => this._store$.dispatch(offerInProgressAction()))
    .then(() => this.refreshRequestList())
    .then(() => this._snackBar.open('Предложение отправлено!', '', {
      duration: 1500,
    }))
		// .then(() => this._requestDataService.addRequestToMap(userRequest.city, userRequest.category, userRequest.fromUser, userRequest.id))
		.catch((error: Error) => {
			this._store$.dispatch(offerInProgressAction());
			console.log(error);
			});

  }

  public initCurrentFilter(): void {
    
    this._offerFacade.offerFilterName$.pipe(take(1))
    .subscribe((filterName: string) => {
      if (filterName === OfferFilterName[0]) {
        this.filterAll();
      }
      else if (filterName === OfferFilterName[1]) {
        this.filterActive();
      }
      else if (filterName === OfferFilterName[2]) {
        this.filterResponsed();
      }
      else if (filterName === OfferFilterName[3]) {
        this.filterRejected();
      }
    console.log('init filter')
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
    setTimeout(() => this.initCurrentFilter(), 0);
  }


  public filterAll(): void {
    this._offerFacade.offerRequestList$.pipe(take(1))
    .subscribe((requestList: Request[]) => {
    this._offerFacade.setFilteredRequestList(requestList);
    this._offerFacade.setOfferFilterName(OfferFilterName[0]);
  });
  }
  
  public filterActive(): void {
    this._userFacade.currentUser$.pipe(take(1))
          .subscribe((updatedUser: User) => {
          this.currentUser = updatedUser;
          });
    this._offerFacade.offerRequestList$.pipe(take(1))
    .subscribe((requestList: Request[]) => {
    const rejectedRequests: string[] = Object.assign([], this.currentUser.sellerRejectedRequests);
    let responsedRequests: string[] = [];

    if(this.currentUser.sellerResponsedRequests && this.currentUser.sellerResponsedRequests.requestId) {
      responsedRequests = Object.assign([], this.currentUser.sellerResponsedRequests.requestId);
    }
    
    console.log(responsedRequests, requestList);
    const unwantedArr: string[] = [...rejectedRequests, ...responsedRequests];
    const requests: Request[] = requestList.filter((request: Request) =>
    !unwantedArr.includes(request.id));
    // const requests: Request[] = requestList.filter((request: Request) =>
    // !unwantedArr.includes(request.id));
    this._offerFacade.setFilteredRequestList(requests);
    this._offerFacade.setOfferFilterName(OfferFilterName[1]);
    });
  }
  public filterResponsed(): void {
    this._offerFacade.offerRequestList$.pipe(take(1))
    .subscribe((requestList: Request[]) => {
    this._userFacade.currentUser$.pipe(take(1))
          .subscribe((updatedUser: User) => {
          this.currentUser = updatedUser;
          });
    let responsedRequests: string[] = [];
    if(this.currentUser.sellerResponsedRequests && this.currentUser.sellerResponsedRequests.requestId){
      responsedRequests = Object.assign([], this.currentUser.sellerResponsedRequests.requestId);
    }    const requests: Request[] = requestList.filter((request: Request) =>
    responsedRequests.includes(request.id));
    this._offerFacade.setFilteredRequestList(requests);
    this._offerFacade.setOfferFilterName(OfferFilterName[2]);
        });
  }
  public filterRejected(): void {
    this._userFacade.currentUser$.pipe(take(1))
          .subscribe((updatedUser: User) => {
          this.currentUser = updatedUser;
          });
    this._offerFacade.offerRequestList$.pipe(take(1))
    .subscribe((requestList: Request[]) => {
    const rejectedRequests: string[] = Object.assign([], this.currentUser.sellerRejectedRequests);
    const requests: Request[] = requestList.filter((request: Request) =>
    rejectedRequests.includes(request.id));
    this._offerFacade.setFilteredRequestList(requests);
    this._offerFacade.setOfferFilterName(OfferFilterName[3]);
    });
  }

}
