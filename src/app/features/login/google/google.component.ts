import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';

import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { UserState, inProgressAction } from 'src/app/store';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(
	public afAuth: AngularFireAuth,
	private _router: Router,
	public dataService: DataService,
	private _store$: Store<UserState>) { }

  ngOnInit(): void {
  }

  public signInGoogle(): void {
	this.dataService.loading();
	console.log(auth)
	this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
		.then(() => this._router.navigate(['']), () => this.dataService.loading())
		.then(() => this.dataService.loading());
  }

}
 