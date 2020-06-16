import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
//import { auth, database } from 'firebase';

import { Store, select } from '@ngrx/store';
import { UserState } from './store';
// import { Observable } from 'rxjs';
import { UserDataService } from './services/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  public title: string = 'offerbook';
  public nameMask: string = 'User';

  constructor(
	  public afAuth: AngularFireAuth,
	  private _router: Router,
	  public userDataService: UserDataService,
	  public db: AngularFireDatabase,
	  public store$: Store<UserState>,
	  // private store$: Store<UserState>
	) {
		// this.users$ = db.list('users').valueChanges()
	}

	ngOnInit(): void {
		// this.store$.pipe(select(currentUserSelector)).subscribe(data=>data.userName ? this.userDataService.userName = data.userName : 'User');
	}
	ngAfterContentInit(): void {
		this.afAuth.authState.subscribe((a: firebase.User) => a ? this.userDataService.getUserName(a.uid) : null);
	}

  public signOut(): void {
	this.userDataService.signOut();
  }
}
