import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { requestInProgressAction } from 'src/app/store';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable()
export class OfferbookDataService {

  private _baseImageUrl: string = '/images';
  private _uploadTask: firebase.storage.UploadTask;
  public photoBaseURL: string = `${this._baseImageUrl}/${firebase.auth().currentUser.uid}`;

  public userUid: string = firebase.auth().currentUser.uid;

  constructor(
	private _httpClient: HttpClient,
	private _store$: Store,
	private _snackBar: MatSnackBar
  ) { }

  public uploadRequestImage(file: any, name: string): void {
	const uploadFile: File = file;
	const storageRef: firebase.storage.Reference = firebase.storage()
	.ref(this.photoBaseURL + `/${name}`);
	this._uploadTask = storageRef.put(uploadFile);
	this._uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
		() => {},
		(error: Error) => console.log(error),
		() => {this._store$.dispatch(requestInProgressAction());
			this._snackBar.open('Готово!', '', {
				duration: 2000,
			  });
		}
	)
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

  public sendRequestToDatabase(request): void {
	  firebase.database().ref(`requests/${this.userUid}/${request.id}`).set(request)
  }
}
