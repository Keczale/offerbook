import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Request, RequestStatus } from 'src/app/models/request.model';

import { loadInitialStateAction } from 'src/app/store';
import { loadActualRequestListFromDBAction } from 'src/app/store/offer';
import { User, SellersResponsedRequests } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Offer } from 'src/app/models/offer.model';


@Injectable({
  providedIn: 'root'
})
export class OfferDataService {

	private _uploadTask: firebase.storage.UploadTask;
	private _startImageUrl: string = '/image';
  private requestBaseURL: string = '/requests/active';
  private _offerStartURL: string = '/offer/active';
  private _noPhotoUrl: string = '../assets/img/no-photo.jpg';

  public requestMapBaseURL: string = '/requests/map';
  public userBaseURL: string = '/users';

  public userUid: string = firebase.auth().currentUser.uid;

  public photoBaseURL: string = `${this._startImageUrl}/${this.userUid}`;
  public offerBaseURL: string = `${this._offerStartURL}/${this.userUid}`;

  constructor(
	private _store$: Store,
	private _snackBar: MatSnackBar,

  ) { }

	public async createList(sellerLocation: string[], sellerCategories: string[]): Promise<any>{
		const actualRequests: Request[] = [];

		sellerLocation.map((city: string) => sellerCategories.map(async (category: string) =>{
			await new Promise((resolve) => {

						firebase.database().ref(`${this.requestMapBaseURL}/${city}/${category}`).once('value')
							.then((snap: any) => snap.val())
							.then((requestMap: string[]) => {
								if (requestMap) {
									const actualRequestList: string[] = Object.values(requestMap);
										actualRequestList.map((adress: string) => {
										firebase.database().ref(`${this.requestBaseURL}/${adress}`).once('value')
											.then((snap: any) => snap.val())
											.then((request: Request) => {
												actualRequests.push(request);
												resolve('done');
											});

									});
								}
								else {
									this._store$.dispatch(loadInitialStateAction());
									resolve('done with empty');
								}
							});

					});
					return actualRequests;

		}));

	}
public async loadOwnRequests(userId: string): Promise<string[]>{
	let requestIdList: string[] = [];
	await firebase.database().ref(`${this.requestBaseURL}/${userId}`).once('value')
	.then((snap: any) => snap.val())
	.then( async (requestMap: string[]) => {
		if (requestMap) {
			requestIdList = Object.keys(requestMap);
		}
	});
	return requestIdList;
}
public isEmpty (obj: any): boolean {
    if (obj) {
      for (let key in obj) {
        return false;
      }
    
    return true;
  }
	}

  public async loadActualListFromDB(sellerLocation: string[], sellerCategories: string[], sellersResponsed: SellersResponsedRequests): Promise<Request[]> {
	let actualRequests: Request[] = [];

	if (sellersResponsed && sellersResponsed.requestRef) {
	const responsedRefs: string[] = Object.assign([], sellersResponsed.requestRef);
	responsedRefs.map((ref: string) => {
		firebase.database().ref(`${this.requestBaseURL}/${ref}`).once('value')
		.then((snap: any) => snap.val())
		.then((request: Request) => {
			if (request && request.status === RequestStatus[1]) {
			actualRequests.push(request);
			}
		});
	});
	}
		await new Promise(async (resolve) => {

			await Promise.all(sellerLocation.map(async (city: string) => {

				await Promise.all(sellerCategories.map(async (category: string) => {
			  await new Promise( (resolve) => {

						firebase.database().ref(`${this.requestMapBaseURL}/${city}/${category}`).once('value')
							.then((snap: any) => snap.val())
							.then( async (requestMap: string[]) => {
								if (requestMap) {

									const actualRequestRefList: string[] = Object.values(requestMap);
									await Promise.all(actualRequestRefList.map(async (adress: string) => {
										await new Promise( (resolved) => {
										firebase.database().ref(`${this.requestBaseURL}/${adress}`).once('value')
											.then((snap: any) => snap.val())
											.then((request: Request) => {
												actualRequests = Object.assign([], actualRequests)
												actualRequests.push(request);

											}).then((request) => resolved(request)) // здесь проблема - получает резолв и пшел дальше
										});
											}));
									// resolve(actualRequests)
								}
								else {
									this._store$.dispatch(loadInitialStateAction());
									resolve (actualRequests);
								}
							}).then(() => resolve('done'));

				 });


		})); })).then(() => {resolve();
							});
	});
		return actualRequests;

  }

  public async loadBuyerInfo(uid: string): Promise<User> {
	let buyer: User = null;
	await firebase.database().ref(`${this.userBaseURL}/${uid}`).once('value')
	.then((snap: any) => snap.val())
	.then((user: User) => buyer = user)
	.catch((error: Error) => console.log(error));
	return buyer;
  }

	public async uploadOfferImage(file: File, fileName: string): Promise<string> {
		const uploadFile: File = file;
		let photoURL: string;
		if (file) {
		const storageRef: firebase.storage.Reference = firebase.storage()
			.ref(`${this.photoBaseURL}/${fileName}`);
	
		await new Promise((resolve) => {
		this._uploadTask =  storageRef.put(uploadFile);
		this._uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
				() => { },
				(error: Error) => {this._snackBar.open(`${error}`, '', {
					duration: 2000,
				  });
				},
				 async () => {
					photoURL = await firebase.storage().ref(`${this.photoBaseURL}/${fileName}`).getDownloadURL();
					resolve('done');
	
					this._snackBar.open('Готово!', '', {
					duration: 2000,
				  });
				});
				});
		return photoURL; }
		else {
			 return this._noPhotoUrl;
			}
}

public sendOfferToDatabase(offer: Offer, requestsUser: string): void {
	firebase.database().ref(`${this.requestBaseURL}/${requestsUser}/${offer.requestId}/offers`).push(offer);
}

}
