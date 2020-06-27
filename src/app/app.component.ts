import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { auth, database } from 'firebase';

import { Store, select } from '@ngrx/store';
import { UserState } from './store';
import { UserDataFacade } from './store/userData/user-data.facade';
import { Observable } from 'rxjs';
import { RequestFacade } from './store/request/request.facade';
import { MatDialog } from '@angular/material/dialog';
import { PopupLocationComponent } from './app-components/popup-location/popup-location.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'offerbook';
  public nameMask: string = 'User';

  // public location: string = null;

  public userIsLoading: Observable<boolean> = this.userDataFacade.isLoading;
  public requestIsLoading: Observable<boolean> = this.requestFacade.isLoading;


  constructor(
	  public afAuth: AngularFireAuth,
	  private _router: Router,
	  public userDataFacade: UserDataFacade,
	  public requestFacade: RequestFacade,
	  public db: AngularFireDatabase,
	  public store$: Store<UserState>,
	  public dialog: MatDialog,

	) {	}

	// public userlocation: Subscription;

	ngOnInit(): void {
		this.afAuth.authState.subscribe((a: firebase.User) => a ? this.userDataFacade.loadCurrentUserFromDB(a.uid) : null);
		// this.userlocation = this.userDataFacade.userLocation$.subscribe((city: string) => this.location = city);
	}

	// ngOnDestroy(): void {
	// 	this.userlocation.unsubscribe();
	// }

  public signOut(): void {
	this.userDataFacade.userSignOut();
  }

  public openDialog(): void {
    this.dialog.open(PopupLocationComponent);
  }
}
