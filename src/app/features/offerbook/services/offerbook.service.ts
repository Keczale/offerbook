import { Injectable } from '@angular/core';
import { productCategories } from 'src/app/models/common';
import { Store, select } from '@ngrx/store';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { requestInProgressAction, requestListSelector, createRequestAction } from 'src/app/store';
import { OfferbookDataService } from './offerbook-data.service';
import { Request } from 'src/app/models/request.model';

@Injectable()
export class OfferbookService {
	private _idPrefficsEnd: number = 2;
	private _idPrefficsStart: number = 5;
	private _PhotoNamePrefficsStart: number = 6;

	public categories: string[] = productCategories;

	public requestList$ = this._store$.pipe(select(requestListSelector));

  constructor(
	  private _store$: Store,
	// private _snackBar: MatSnackBar,
	private _offerbookDataService: OfferbookDataService
  ) { }

  	private get autoKey(): string {
	return this._offerbookDataService.userUid.slice(0, this._idPrefficsEnd) +
	(this._dateStamp().slice(this._dateStamp.length - this._idPrefficsStart, this._dateStamp().length)); }

	
	private _dateCreating(): Date {
		return new Date();
	}
	
	private _dateStamp(): string {
		return (Date.now()).toString();
	}

  public submitForm(value: any): void {
	const fileName: string = value.requestImage.files[0].name;
	const photoName: string = `${this.autoKey}${fileName.slice(fileName.length - 5, fileName.length) }`;

	this._store$.dispatch(requestInProgressAction());
	this._offerbookDataService.uploadRequestImage(value.requestImage.files[0], photoName);
	let userRequest: Request = new Request();
	
	userRequest = {
		...userRequest,
		id: this.autoKey,
		fromUser: this._offerbookDataService.userUid,
		title: value.title,
		description: value.description,
		category: value.category,
		dateCreating: this._dateCreating(),
		photos:[this._offerbookDataService.photoBaseURL + `/${photoName}`]
		}
		this._offerbookDataService.sendRequestToDatabase(userRequest)
	this._store$.dispatch(createRequestAction({request: userRequest}))
	}


}
