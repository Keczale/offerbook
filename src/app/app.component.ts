import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { auth, database } from 'firebase';

import { Store, select } from '@ngrx/store';
import { UserState } from './store';
// import { Observable } from 'rxjs';
import { UserDataService } from './features/login/services/user-data.service';
import { UserDataFacade } from './store/userData/user-data.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'offerbook';
  public nameMask: string = 'User';

  public isLoading: Observable<boolean> = this.userDataFacade.isLoading;


  constructor(
	  public afAuth: AngularFireAuth,
	  private _router: Router,
	  public userDataFacade: UserDataFacade,
	  public db: AngularFireDatabase,
	  public store$: Store<UserState>,
	) {
	}

	ngOnInit(): void {
		this.afAuth.authState.subscribe((a: firebase.User) => a ? this.userDataFacade.loadCurrentUserFromDB(a.uid) : null);
	}

  public signOut(): void {
	this.userDataFacade.userSignOut();
  }
}
