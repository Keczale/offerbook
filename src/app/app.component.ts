import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, HostListener } from '@angular/core';
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
import { AppFacade } from './store/app/app.facade';
import { breakpoints, MainToggle } from './models/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

	private _loadTimeout: number = 2000;

	private _ngUnsubscribe: Subject<any> = new Subject();
	private _ngUnsubscribeForLocation: Subject<any> = new Subject();

	public title: string = 'offerbook';
	public nameMask: string = 'User';

	public userIsLoading: Observable<boolean> = this.userDataFacade.isLoading;
	public requestIsLoading: Observable<boolean> = this.requestFacade.isLoading;
	public offerIsLoading: Observable<boolean> = this.offerFacade.isLoading;
	public loadPage: boolean = false;

	public mainToggle: any = MainToggle;


  constructor(
		public afAuth: AngularFireAuth,
		public userDataFacade: UserDataFacade,
		public requestFacade: RequestFacade,
		public offerFacade: OfferFacade,
		public db: AngularFireDatabase,
		public store$: Store<UserState>,
		public dialog: MatDialog,
		private cdRef: ChangeDetectorRef,
		public appFacade: AppFacade,
	) {	}

	@HostListener('window:resize', ['$event'])
	private _onResize(event: any): void {
		const width: number = event.target.innerWidth;
		this.appFacade.setScreenWidth(width);
	}
	@HostListener('window:scroll')
	private _onScroll(): void {
	// const scroll: number = event.target['scrollingElement'].scrollTop;
	const scroll: number = window.pageYOffset;
	this.appFacade.setScrollTop(scroll);
	}

	ngOnInit(): void {
		this.afAuth.authState.pipe(takeUntil(this._ngUnsubscribe)).subscribe((authUser: firebase.User) => {
			if (authUser) {
				this.userDataFacade.loadCurrentUserFromDB(authUser.uid);
				this._ngUnsubscribe.next();
				this._ngUnsubscribe.complete();
			}
		});
		this.appFacade.setScreenWidth(window.innerWidth);
		setTimeout(() => this.loadPage = true, this._loadTimeout);
	}

	ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
		}

  ngAfterViewInit(): void {
		this.userDataFacade.currentUser$.pipe(takeUntil(this._ngUnsubscribeForLocation))
		.subscribe((user: User) => {
			if (Boolean(user.id)) {
				if (!Boolean(user.location)) {
					this.dialog.open(PopupLocationComponent);
				}
				this._ngUnsubscribeForLocation.next();
				this._ngUnsubscribeForLocation.complete();
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

	public isGreaterThenMobile(param: number): boolean {
		return param > breakpoints.mobile;
	}
}
