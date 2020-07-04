import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { auth, database } from 'firebase';

import { Store, select } from '@ngrx/store';
import { UserState } from './store';
import { UserDataFacade } from './store/userData/user-data.facade';
import { Observable, Subscription } from 'rxjs';
import { RequestFacade } from './store/request/request.facade';
import { MatDialog } from '@angular/material/dialog';
import { PopupLocationComponent } from './app-components/popup-location/popup-location.component';
import { User } from './models/user.model';
import { OfferComponent } from './features/offerbook/offer/offer.component';
import { OfferFacade } from './store/offer/offer.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  public title: string = 'offerbook';
  public nameMask: string = 'User';

  // public currentUser: User = null;

  public userIsLoading: Observable<boolean> = this.userDataFacade.isLoading;
  public requestIsLoading: Observable<boolean> = this.requestFacade.isLoading;
  public offerIsLoading: Observable<boolean> = this.offerFacade.isLoading;

 //  public currentUserSubscriber: Subscription;


  constructor(
	  public afAuth: AngularFireAuth,
	  // private _router: Router,
	  public userDataFacade: UserDataFacade,
	  public requestFacade: RequestFacade,
	  public offerFacade: OfferFacade,
	  public db: AngularFireDatabase,
	  public store$: Store<UserState>,
	  public dialog: MatDialog,
	  private cdRef: ChangeDetectorRef


	) {	}


	ngOnInit(): void {
		this.afAuth.authState.subscribe((a: firebase.User) => a ? this.userDataFacade.loadCurrentUserFromDB(a.uid) : null);
		// this.currentUserSubscriber = this.userDataFacade.currentUser$.subscribe((user: User) => this.currentUser = user);
	}

	ngAfterViewChecked(): void{
		this.cdRef.detectChanges();

	}

	// ngOnDestroy(): void {
	// 	this.currentUserSubscriber.unsubscribe();
	// }

  public signOut(): void {
	this.userDataFacade.userSignOut();
  }

  public openDialog(): void {
    this.dialog.open(PopupLocationComponent);
  }
}
