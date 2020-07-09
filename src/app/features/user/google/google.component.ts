import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent implements OnInit {

  constructor(
	public afAuth: AngularFireAuth,
	public userDataService: UserDataService,
	) { }

  ngOnInit(): void {}

  public signInGoogle(): void {
	this.userDataService.signInGoogle();
  }

}
