import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { requestInProgressAction, loadRequestListFromDBAction, loadInitialStateAction } from 'src/app/store';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Request } from 'src/app/models/request.model';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
	providedIn: 'root'
  })
export class RequestDataService {

	private _uploadTask: firebase.storage.UploadTask;
  private _baseImageUrl: string = '/images';
  private _baseActiveRequestUrl: string = '/requests/active';
  private _baseActiveRequestMapURL: string = '/requests/map';

  public photoBaseURL: string = `${this._baseImageUrl}/${firebase.auth().currentUser.uid}`;
  public requestBaseURL: string = `${this._baseActiveRequestUrl}/${firebase.auth().currentUser.uid}`;


  public userUid: string = firebase.auth().currentUser.uid;
  
  constructor(
	private _httpClient: HttpClient,
	private _store$: Store,
	private _snackBar: MatSnackBar,
	public db: AngularFireDatabase
  ) { }

	private _downloadPhotoURL: string;

  public get downloadPhotoURL(): string {
	return this._downloadPhotoURL;
  }

  public set downloadPhotoURL(fileName: string) {

	 firebase.storage().ref(`${this.photoBaseURL}/${fileName}`).getDownloadURL().then((url: string) => {
		console.log(url);
		this._downloadPhotoURL = url;
		console.log(this._downloadPhotoURL);

	  }).catch((error: any) =>
		console.log(error));
}

  public async uploadRequestImage(file: any, fileName: string): Promise<string> {
	const uploadFile: File = file;
	let photoURL: string;
	if(file){
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
				resolve('done')

				this._snackBar.open('Готово!', '', {
				duration: 2000,
			  });
			});
			})
	return photoURL}
	else { return 'no changes'}
			

	//   const formData: FormData  = new FormData();
	// const httpOptions: object = {
	//   headers: new HttpHeaders({
	//     'Content-Type': 'multipart/form-data',
	//   })};
	// formData.append('requestImage', value.requestImage.files[0], value.requestImage.files[0].name);
	// this._httpClient.post<File>(`/assets/`, formData).subscribe(
	//   (response) => console.log(response),
	//   (error) => console.log(error)
	// )
  }

  public addRequestToMap(city: string, category: string, fromUser: string, id: string): void {
	firebase.database().ref(`${this._baseActiveRequestMapURL}/${city}/${category}/${id}`)
	.set(`${fromUser}/${id}`);
  }
  public removeRequestFromMap(userRequest): void {
	this.db.list(`${this._baseActiveRequestMapURL}/${userRequest.city}/${userRequest.category}`)
	.remove(`${userRequest.id}`);
  }

  public sendRequestToDatabase(request: any): void {

	  firebase.database().ref(`${this.requestBaseURL}/${request.id}`).set(request);

  }

  public loadActialListFromDB(): void {
	firebase.database().ref(`${this.requestBaseURL}`).once('value')
	.then((snap: any) => snap.val())
	.then((requestMap) =>
	{ if (requestMap) {
		const requestList: Request[] = Object.values(requestMap);
		this._store$.dispatch(loadRequestListFromDBAction({requests: requestList}))
		}
	else {
		// const arr: string[] = [''];
		this._store$.dispatch(loadInitialStateAction())}
  });
}

  public async deleteImageRequest(fileName: string): Promise<string> {
	  if(firebase.storage().ref(`${this.photoBaseURL}/${fileName}`)){
		firebase.storage().ref(`${this.photoBaseURL}/${fileName}`).delete()
		.catch((error) => console.log(error));
	  }
	  return('Фото удалено')
  }

  public async deleteRequestFromDB(requestId: string): Promise<string> {
	await this.db.list(`${this.requestBaseURL}/`).remove(`${requestId}`)
	.catch((error) => console.log(error));
	return ('Карточка удалена :)');
  }
}
