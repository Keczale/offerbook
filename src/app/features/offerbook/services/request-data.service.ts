import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Request } from 'src/app/models/request.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
	providedIn: 'root'
  })
export class RequestDataService {

	private _downloadPhotoURL: string;
	private _uploadTask: firebase.storage.UploadTask;
  private _baseImageUrl: string = '/images';
  private _baseActiveRequestUrl: string = '/requests/active';
  private _baseActiveRequestMapURL: string = '/requests/map';
  private _noPhotoUrl: string = '../assets/img/no-photo.jpg';


  public get userUid(): string {
		return firebase.auth().currentUser.uid;
	}

  public get photoBaseURL(): string {
		return `${this._baseImageUrl}/${this.userUid}`;
	}

  public get requestBaseURL(): string {
		return `${this._baseActiveRequestUrl}/${this.userUid}`;
	}

  constructor(
	private _httpClient: HttpClient,
	private _store$: Store,
	private _snackBar: MatSnackBar,
	public db: AngularFireDatabase
  ) { }

  public get downloadPhotoURL(): string {
	return this._downloadPhotoURL;
  }

  public set downloadPhotoURL(fileName: string) {

	 firebase.storage().ref(`${this.photoBaseURL}/${fileName}`).getDownloadURL().then((url: string) => {
		this._downloadPhotoURL = url;
		})
		.catch((error: any) =>
		console.log(error));
}

  public async uploadRequestImage(file: any, fileName: string): Promise<string> {
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

  public addRequestToMap(city: string, category: string, fromUser: string, id: string): void {
	firebase.database().ref(`${this._baseActiveRequestMapURL}/${city}/${category}/${id}`)
	.set(`${fromUser}/${id}`);
  }
  public removeRequestFromMap(userRequest: Request): void {
	this.db.list(`${this._baseActiveRequestMapURL}/${userRequest.city}/${userRequest.category}`)
	.remove(`${userRequest.id}`);
  }

  public async sendRequestToDatabase(request: Request): Promise <string> {

	  await firebase.database().ref(`${this.requestBaseURL}/${request.id}`).set(request)
	  .catch((error: Error) => console.log(error));
	return 'done';
  }

  public async loadActualListFromDB(): Promise<any> {
	let requestMap: any = null;
	await firebase.database().ref(`${this.requestBaseURL}`).once('value')
	.then((snap: any) => snap.val())
	.then((map: object) => requestMap = map);
	return requestMap;
}

  public async deleteImageRequest(fileName: string): Promise<string> {
	  if (Boolean(fileName) && firebase.storage().ref(`${this.photoBaseURL}/${fileName}`)) {
		firebase.storage().ref(`${this.photoBaseURL}/${fileName}`).delete()
		.catch((error: Error) => console.log(error));
	  }
	  return('Фото удалено');
  }

  public async deleteRequestFromDB(requestId: string): Promise<string> {
	await this.db.list(`${this.requestBaseURL}/`).remove(`${requestId}`)
	.catch((error: Error) => console.log(error));
	return ('Карточка удалена :)');
  }
}
