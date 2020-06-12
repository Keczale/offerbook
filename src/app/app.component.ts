import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'offerbook';
  constructor(
	  private _auth: AngularFireAuth,
	  private _router: Router
	) {}

  public signOut(): void {
	this._auth.signOut().then(data=> this._router.navigate(['/login']));
  }
}
