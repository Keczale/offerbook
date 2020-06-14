import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { UserState, inProgressAction, DataIsLoadingSelector } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'offerbook';
  public nameMask: string = 'User' 

  constructor(
	  public afAuth: AngularFireAuth,
	  private _router: Router,
	  public dataService: DataService,
	  //private _store$: Store<UserState>
	) {}

  public signOut(): void {
	this.dataService.loading();
	this.afAuth.signOut()
	.then(() => this.dataService.loading())
	.then(() => this._router.navigate(['/login']));
  }

}
