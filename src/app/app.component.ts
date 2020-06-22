import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { auth, database } from 'firebase';

import { Store, select } from '@ngrx/store';
import { UserState } from './store';
// import { Observable } from 'rxjs';
import { UserDataService } from './features/user/services/user-data.service';
import { UserDataFacade } from './store/userData/user-data.facade';
import { Observable } from 'rxjs';
import { RequestFacade } from './store/request/request.facade';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'offerbook';
  public nameMask: string = 'User';

  public userIsLoading: Observable<boolean> = this.userDataFacade.isLoading;
  public requestIsLoading: Observable<boolean> = this.requestFacade.isLoading;


  constructor(
	  public afAuth: AngularFireAuth,
	  private _router: Router,
	  public userDataFacade: UserDataFacade,
	  public requestFacade: RequestFacade,
	  public db: AngularFireDatabase,
	  public store$: Store<UserState>,
	//   public dialog: MatDialog,

	) {
	}

	ngOnInit(): void {
		this.afAuth.authState.subscribe((a: firebase.User) => a ? this.userDataFacade.loadCurrentUserFromDB(a.uid) : null);
	}

  public signOut(): void {
	this.userDataFacade.userSignOut();
  }

//   public openDialog(): void {
//     this.dialog.open(PopupComponent);
//   }
}
