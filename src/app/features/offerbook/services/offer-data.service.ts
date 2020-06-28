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

  public requestBaseURL: string = '/requests/active';
  public requestMapBaseURL: string = '/requests/map';

  constructor(
    private _store$: Store,
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
												console.log(`${this.requestBaseURL}/${adress}`)
											firebase.database().ref(`${this.requestBaseURL}/${adress}`).once('value')
												.then((snap: any) => snap.val())
												.then((request: Request) => {
													console.log(request, actualRequests); actualRequests.push(request);
													resolve('done')})
	
										});
									}
									else {
										this._store$.dispatch(loadInitialStateAction());
										resolve('done with empty')
									}
								});
	
					 })
					 return actualRequests;

			}))
			
		}


  public async loadActualListFromDB(sellerLocation: string[], sellerCategories: string[]): Promise<Request[]> {
		let actualRequests: Request[] = [];
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
										console.log(`${this.requestBaseURL}/${adress}`)
										firebase.database().ref(`${this.requestBaseURL}/${adress}`).once('value')
											.then((snap: any) => snap.val())
											.then((request: Request) => {
												actualRequests = Object.assign([], actualRequests)
												actualRequests.push(request);
												console.log(request, actualRequests);

											}).then((request) => resolved(request)) // здесь проблема - получает резолв и пшел дальше
										})
											})); console.log('11111111')
									// resolve(actualRequests)
								}
								else {
									this._store$.dispatch(loadInitialStateAction());
									console.log('else')
									resolve (actualRequests)
								}
							}).then(() => resolve('done'));

				 }).then((requesty: Request[]) => { console.log(actualRequests); } );
				 

		})); console.log(22222222)})).then(() => {console.log(actualRequests); resolve()});
	})
	console.log(actualRequests)
		return actualRequests;

  }

}
