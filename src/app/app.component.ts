import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from '@ngrx/store';
import { UserState } from './store';
import { UserDataFacade } from './store/userData/user-data.facade';
import { Observable, Subject } from 'rxjs';
import { RequestFacade } from './store/request/request.facade';
import { MatDialog } from '@angular/material/dialog';
import { PopupLocationComponent } from './app-components/popup-location/popup-location.component';
import { OfferFacade } from './store/offer/offer.facade';
import { User } from './models/user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  private _ngUnsubscribe: Subject<any> = new Subject();

  public title: string = 'offerbook';
  public nameMask: string = 'User';

  public userIsLoading: Observable<boolean> = this.userDataFacade.isLoading;
  public requestIsLoading: Observable<boolean> = this.requestFacade.isLoading;
  public offerIsLoading: Observable<boolean> = this.offerFacade.isLoading;

  constructor(
	  public afAuth: AngularFireAuth,
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
	}

	ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
  	}
  ngAfterViewInit(): void {
		this.userDataFacade.currentUser$.pipe(takeUntil(this._ngUnsubscribe))
		.subscribe((user: User) => {
			if (Boolean(user.id)) {
				if (!Boolean(user.location)) {
					this.dialog.open(PopupLocationComponent );
				}
				this._ngUnsubscribe.next();
				this._ngUnsubscribe.complete();
			}
		});
	}

	ngOnDestroy(): void {
		this._ngUnsubscribe.next();
		this._ngUnsubscribe.complete();
	}

  public signOut(): void {
	this.userDataFacade.userSignOut();
  }

  public openDialog(): void {
		this.dialog.open(PopupLocationComponent);
  }
}
