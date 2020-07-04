import { Injectable } from '@angular/core';
import { productCategories } from 'src/app/models/common';
import { Store, select } from '@ngrx/store';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { requestInProgressAction, requestListSelector, createRequestAction, initChangeRequestAction, endChangeRequestAction, loadRequestListFromDBAction, loadInitialStateAction, userDataReducer, setLastOfferToRequestsAction } from 'src/app/store';
import { RequestDataService } from './request-data.service';
import { Request, RequestStatus } from 'src/app/models/request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { Observable } from 'rxjs';
import { User, LastOffer } from 'src/app/models/user.model';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { take } from 'rxjs/operators';
import { Offer, OfferStatus } from 'src/app/models/offer.model';

@Injectable({
	providedIn: 'root'
  })
export class RequestService {
	private _idPrefficsEnd: number = 2;
	private _idPrefficsStart: number = 6;
	private _fileNameEndCut: number = 5;

	private _PhotoNamePrefficsStart: number = 6;

	public categories: string[] = productCategories;

	public requestList$: Observable<Request[]> = this._store$.pipe(select(requestListSelector));

  constructor(
	private _store$: Store,
	private _requestDataService: RequestDataService,
	private _snackBar: MatSnackBar,
	public dialog: MatDialog,
	private _requestFacade: RequestFacade,
	private _userFacade: UserDataFacade
  ) { }

  	private get autoKey(): string {
	return (this._dateStamp().slice(this._dateStamp.length - this._idPrefficsStart, this._dateStamp().length)) +
	this._requestDataService.userUid.slice(0, this._idPrefficsEnd); }

	// private get _dateCreating(): Date {
	// 	return new Date();
	// }
	private _dateStamp(): string {
		return (Date.now()).toString();
	}

	public openDialog(component: any): void {
		this.dialog.open(component, {
		  // height: '400px',
		  width: '50%',
		});
	  }

  public submitForm(value: any): void {

	const requestId: string = this.autoKey;
	let fileName: string = '';
	let photoName: string = '';
	let file: File = null;

	if (value.requestImage){
		fileName = value.requestImage.files[0].name;
		photoName = `${this.autoKey}${fileName.slice(fileName.length - this._fileNameEndCut, fileName.length) }`;
		file = value.requestImage.files[0];
	}
	
	// let downloadPhotoURL: string;
	let userRequest: Request = new Request();

	this._store$.dispatch(requestInProgressAction());

	this._requestDataService.uploadRequestImage(file, photoName)
	.then((downloadPhotoURL) => {
		const dateCreateStamp: number = Date.now();
		userRequest = {
		...userRequest,
		id: requestId,
		fromUser: this._requestDataService.userUid,
		title: value.title,
		description: value.description,
		category: value.category,
		city: value.city,
		secondHand: value.secondHand,
		dateCreating: dateCreateStamp,
		lastChange: dateCreateStamp,
		photos: [downloadPhotoURL],
		photoNames: [photoName]
		//offers: []
		};
	})
		.then(() => this._requestDataService.sendRequestToDatabase(userRequest))
		.then(() => this.loadActualList())
		//.then(() => this._store$.dispatch(createRequestAction({request: userRequest})))
		.then(() => this._store$.dispatch(requestInProgressAction()))
		.then(() => this._requestDataService.addRequestToMap(userRequest.city, userRequest.category, userRequest.fromUser, userRequest.id))
		.catch((error: Error) => {
			this._store$.dispatch(requestInProgressAction());
			console.log(error);
			});
			}
	
	public async simpleLoadActualList(): Promise <string> {
		this._store$.dispatch(requestInProgressAction());
		await this._requestDataService.loadActualListFromDB()
		.then((requestMap: object) => {
			if (!this.isEmpty(requestMap)) {
				const requestList: Request[] = Object.values(requestMap)
				return requestList;
			}
		})
		.then((requests: Request[]) => {console.log(requests);
			this._store$.dispatch(loadRequestListFromDBAction({requests}));
		this._store$.dispatch(requestInProgressAction());
		})
		.catch((error: Error) => {
			console.log(error);
			this._store$.dispatch(requestInProgressAction());
		});
		return 'done';
	}


	
	
	public loadActualList(): void {
		this._store$.dispatch(requestInProgressAction());
		this._requestDataService.loadActualListFromDB()
		.then(async (requestMap: object) => {
			if (!this.isEmpty(requestMap)) {
				const requestList: Request[] = Object.values(requestMap)
				.sort((a: Request, b: Request) => a.lastChange - b.lastChange);

				const requestsWithCounter: Request[] = [];

				let newLastOfferList: LastOffer[] = [];

				await new Promise(async (resolve) => {
				let lastOffers: LastOffer[] = [];
				// const currentUser: User = null;
				this._userFacade.lastOffers$.pipe(take(1)).subscribe((offers: LastOffer[]) => lastOffers = offers);
				console.log(lastOffers)// COUNTER
				if (lastOffers && lastOffers.length) {
					console.log(lastOffers)

					await Promise.all (
						
						requestList.map( async (userRequest: Request) => {
						await new Promise((resolve) => {
						if (lastOffers.find((item: LastOffer) => item.request === userRequest.id)) {
							console.log('sdfdsfsdfsd')

							const prevLastOffer: LastOffer = lastOffers.find((item: LastOffer) => item.request === userRequest.id);

							if (!this.isEmpty(userRequest.offers)) {
							const offersArr: Offer[] = Object.values(userRequest.offers);

							const countNewOffer: number = offersArr.sort(( a: Offer, b: Offer) => a.lastChange - b.lastChange)
								.reverse().findIndex((offer: Offer) => offer.id === prevLastOffer.lastOffer);
							userRequest.newOffersToRequest = countNewOffer;
							requestsWithCounter.push(userRequest);
							// newLastOfferList.push({request: userRequest.id, lastOffer: userRequest.offers[0].id});
							console.log(userRequest)

							resolve();
							}
							else{resolve();
								console.log('1')

							}
						}
						else {								console.log('2')
							if (!this.isEmpty(userRequest.offers)){
							const offersArr: Offer[] = Object.values(userRequest.offers);
							const countNewOffer: number = offersArr.length;
							userRequest.newOffersToRequest = countNewOffer;
								requestsWithCounter.push(userRequest);
							}
						resolve();
						}
						});
					}));
					resolve();
					}
				else {
					console.log('если нет')
					requestList.map( (userRequest: Request) => {
						if(!this.isEmpty(userRequest.offers)){
						const offerArr: Offer[] = Object.values(userRequest.offers);
						const countNewOffer: number = offerArr.length;
						userRequest.newOffersToRequest = countNewOffer;
							requestsWithCounter.push(userRequest);
						}
					});
					console.log('requestMap5');
					resolve();
				}
			});
			requestList.map( (userRequest: Request) => {
				if (!this.isEmpty(userRequest.offers)) {
				const offersArr: Offer[] = Object.values(userRequest.offers);
				offersArr.sort(( a: Offer, b: Offer) => a.lastChange - b.lastChange).reverse();
				newLastOfferList.push({request: userRequest.id, lastOffer: offersArr[0].id});
				}
				if (!requestsWithCounter.find((item: Request) => item.id === userRequest.id )){
					requestsWithCounter.push(userRequest);
				}
			});
			this._store$.dispatch(setLastOfferToRequestsAction({ newLastOfferList}));
			this._userFacade.userToDataBase();
			console.log(requestsWithCounter);
			this._store$.dispatch(loadRequestListFromDBAction({requests: requestsWithCounter})); // cxtnxbr ???
			this._store$.dispatch(requestInProgressAction());
			// setTimeout(() => {
			// 	this._store$.dispatch(setLastOfferToRequestsAction({ newLastOfferList}));

			// 	this._userFacade.userToDataBase();
			// 	console.log(requestListWithCounter)

			// 	this._store$.dispatch(loadRequestListFromDBAction({requests: requestList})); // cxtnxbr ???

			// 	this._store$.dispatch(requestInProgressAction());

			// }, 0);
				
			
			}
			else {
				this._store$.dispatch(loadInitialStateAction());
				this._store$.dispatch(requestInProgressAction());
			}

		});

	}
	public isEmpty(obj){
		for(let key in obj){
			return false
		}
		return true
	}

	public deleteRequest(userRequest): void {
		this._store$.dispatch(requestInProgressAction());
		const photoName: string = userRequest.photoNames.length ? userRequest.photoNames[0] : null;
			this._requestDataService.deleteImageRequest(photoName)
			.then((any: any) => this._requestDataService.deleteRequestFromDB(userRequest.id))
			.then((isDone: string) => {
				this.loadActualList();
				this._store$.dispatch(requestInProgressAction());
				this._snackBar.open(isDone, '', {
					duration: 2000,
				});
			})
			.then(() => this._requestDataService.removeRequestFromMap(userRequest))
			.catch((error: Error) => {
				console.log(error);
				this._store$.dispatch(requestInProgressAction());

			});
		
	}


	public initChangeRequestAction (changedRequest: Request): void {
		this._store$.dispatch(initChangeRequestAction ({request : changedRequest}))
	}

	public submitChangeForm(value: any): void {
		this._store$.dispatch(requestInProgressAction());

		let changedRequest: Request = null;
		this._requestFacade.changedRequest$
		.subscribe((request: Request) => changedRequest = request).unsubscribe();

		let file: File = null;
		let fileName: string = '';
		let photoName: string = '';
		if (value.requestImage) {
			 file = value.requestImage.files[0];
			 fileName = file.name;
			 photoName = `${this.autoKey}${fileName.slice(fileName.length - this._fileNameEndCut, fileName.length) }`;
			 this._requestDataService.deleteImageRequest(changedRequest.photoNames[0]);
			}

		if (value.category) {
			if (value.city !== changedRequest.city) {
				this._requestDataService.addRequestToMap(value.city, value.category, changedRequest.fromUser, changedRequest.id);
				this._requestDataService.removeRequestFromMap(changedRequest);
			}
			else {this._requestDataService.addRequestToMap(changedRequest.city, value.category, changedRequest.fromUser, changedRequest.id);
			this._requestDataService.removeRequestFromMap(changedRequest)};
		}

		this._requestDataService.uploadRequestImage(file, photoName)
		.then((downloadPhotoURL: string) => {
			const dateChangeStamp: number = Date.now();
			 changedRequest = {
			...changedRequest,
			title: value.title ? value.title : changedRequest.title,
			description: value.description ? value.description : changedRequest.description,
			category: value.category ? value.category : changedRequest.category,
			photos: value.requestImage ? [downloadPhotoURL] : changedRequest.photos,
			secondHand: value.secondHand,
			city: value.city,
			lastChange: dateChangeStamp,
			photoNames: [photoName]
			//offers: []
			}})
			.then(() => this._requestDataService.sendRequestToDatabase(changedRequest))
			.then(() => this.loadActualList())
			//.then(() => this._store$.dispatch(createRequestAction({request: userRequest})))
			.then(() => this._store$.dispatch(requestInProgressAction()))
			.then(() => this._store$.dispatch(endChangeRequestAction()))
			.then(() => this._snackBar.open('Изменения сохранены!', '', {
				duration: 2000,
			  	}))
			.catch((error) => {
				this._store$.dispatch(requestInProgressAction());
				console.log(error);
				});
	}

	public cancelChanging(): void {
		this._store$.dispatch(endChangeRequestAction());
	}

public acceptOffer(currentRequest, acceptedOffer): void {
	this._store$.dispatch(requestInProgressAction());
	let request = {...currentRequest};
	
	request = {...request, status: RequestStatus[1]};

	for (let key in request.offers){
		//console.log(obj, key, obj[key])
		if (Boolean(key)) {
			const offer: Offer = request.offers[key];
			console.log(offer, offer.status);
	
			offer.id === acceptedOffer.id ?
			request = {...request, offers: {...request. offers, [key]: {...request. offers[key], status: OfferStatus[1] } } } :
			request = {...request, offers: {...request. offers, [key]: {...request. offers[key], status: OfferStatus[2] } } };
		}

	}
	this._requestDataService.sendRequestToDatabase(request)
	.then(() => {
		this._store$.dispatch(requestInProgressAction());
		this._snackBar.open('Вы приняли предложение! Продавец готовит товар!', '', {
			duration: 2500,
			  });
		})
	.then(() => this.simpleLoadActualList())
	.catch((error: Error) => console.log(error));
}

}
