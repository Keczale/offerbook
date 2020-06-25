import { Injectable } from '@angular/core';
import { productCategories } from 'src/app/models/common';
import { Store, select } from '@ngrx/store';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { requestInProgressAction, requestListSelector, createRequestAction, initChangeRequestAction, endChangeRequestAction } from 'src/app/store';
import { RequestDataService } from './request-data.service';
import { Request } from 'src/app/models/request.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RequestFacade } from 'src/app/store/request/request.facade';

@Injectable()
export class RequestService {
	private _idPrefficsEnd: number = 2;
	private _idPrefficsStart: number = 5;
	private _PhotoNamePrefficsStart: number = 6;

	public categories: string[] = productCategories;

	public requestList$ = this._store$.pipe(select(requestListSelector));

  constructor(
	  private _store$: Store,
	// private _snackBar: MatSnackBar,
	private _offerbookDataService: RequestDataService,
	private _snackBar: MatSnackBar,
	public dialog: MatDialog,
	private requestFasade: RequestFacade

  ) { }

  	private get autoKey(): string {
	return this._offerbookDataService.userUid.slice(0, this._idPrefficsEnd) +
	(this._dateStamp().slice(this._dateStamp.length - this._idPrefficsStart, this._dateStamp().length)); }

	private get _dateCreating(): Date {
		return new Date();
	}
	private _dateStamp(): string {
		return (Date.now()).toString();
	}

	public openDialog(component): void {
		this.dialog.open(component, {
		  // height: '400px',
		  width: '50%',
		});
	  }

  public submitForm(value: any): void {
	const fileName: string = value.requestImage.files[0].name;
	const requestId: string = this.autoKey;
	const photoName: string = `${this.autoKey}${fileName.slice(fileName.length - 5, fileName.length) }`;
	// let downloadPhotoURL: string;
	let userRequest: Request = new Request();
	console.log(userRequest)

	this._store$.dispatch(requestInProgressAction());

	this._offerbookDataService.uploadRequestImage(value.requestImage.files[0], photoName)
	.then((downloadPhotoURL) => {
		const dateCreateStamp: number = Date.now();
		userRequest = {
		...userRequest,
		id: requestId,
		fromUser: this._offerbookDataService.userUid,
		title: value.title,
		description: value.description,
		category: value.category,
		dateCreating: dateCreateStamp,
		photos: [downloadPhotoURL],
		photoNames: [photoName]
		//offers: []
		}})
		.then(() => this._offerbookDataService.sendRequestToDatabase(userRequest))
		.then(() => this.loadActualList())
		//.then(() => this._store$.dispatch(createRequestAction({request: userRequest})))
		.then(() => this._store$.dispatch(requestInProgressAction()))
		.then(() => this._offerbookDataService.addRequestToMap(requestId, value.category))
		.catch((error: Error) => {
			this._store$.dispatch(requestInProgressAction());
			console.log(error);
			});
			}

	public loadActualList(): void{
		this._offerbookDataService.loadActialListFromDB()
	}

	public deleteRequest(userRequest): void {
		this._store$.dispatch(requestInProgressAction())
		let photoName: string = userRequest.photoNames ? userRequest.photoNames[0] : null;
		
		this._offerbookDataService.deleteImageRequest(photoName)
		.then((any: any) => this._offerbookDataService.deleteRequestFromDB(userRequest.id))
		.then((isDone: string) => {
			this.loadActualList();
			this._store$.dispatch(requestInProgressAction());
			this._snackBar.open(isDone, '', {
				duration: 2000,
			  });
		})
		.then(() => this._offerbookDataService.removeRequestFromMap(userRequest.id, userRequest.category))
		.catch((error: Error) => {
			console.log(error);
			this._store$.dispatch(requestInProgressAction());

		});
	}


	public initChangeRequestAction(changedRequest){
		this._store$.dispatch(initChangeRequestAction ({request : changedRequest}))
	}

	public submitChangeForm(value: any): void {
		this._store$.dispatch(requestInProgressAction());

		let changedRequest: Request = null;
		this.requestFasade.changedRequest$
		.subscribe((request: Request) => changedRequest = request).unsubscribe();

		let file: File = null;
		let fileName: string = null;
		let photoName: string = null;

		if (value.requestImage) {
			 file = value.requestImage.files[0];
			 fileName = file.name;
			 photoName = `${this.autoKey}${fileName.slice(fileName.length - 5, fileName.length) }`;
			}

		if (value.requestImage) { this._offerbookDataService.deleteImageRequest(changedRequest.photoNames[0])}

		if (value.category) {
			this._offerbookDataService.addRequestToMap(changedRequest.id, value.category);
			this._offerbookDataService.removeRequestFromMap(changedRequest.id, changedRequest.category);
		}

		this._offerbookDataService.uploadRequestImage(file, photoName)
		.then((downloadPhotoURL: string) => {
			const dateChangeStamp: number = Date.now();
			 changedRequest = {
			...changedRequest,
			title: value.title ? value.title : changedRequest.title,
			description: value.description ? value.description : changedRequest.description,
			category: value.category ? value.category : changedRequest.category,
			photos: value.requestImage ? [downloadPhotoURL] : changedRequest.photos,
			photoNames: [photoName]
			//offers: []
			}})
			.then(() => this._offerbookDataService.sendRequestToDatabase(changedRequest))
			.then(() => this.loadActualList())
			//.then(() => this._store$.dispatch(createRequestAction({request: userRequest})))
			.then(() => this._store$.dispatch(requestInProgressAction()))
			.then(() => this._store$.dispatch(endChangeRequestAction()))
			.catch((error) => {
				this._store$.dispatch(requestInProgressAction());
				console.log(error);
				});
				}   

}
