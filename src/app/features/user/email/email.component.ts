import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState, inProgressAction } from 'src/app/store';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public logInForm: FormGroup;

  constructor(
	// private _afAuth: AngularFireAuth,
	private _fb: FormBuilder,
	private _router: Router,
	public userDataService: UserDataService,
	private _store$: Store<UserState>
	) { }

  ngOnInit(): void {
	this.logInForm = this._fb.group({
	email : new FormControl('', [Validators.required, Validators.email]),
	password : new FormControl('', Validators.required),
	});
  }

  public signIn(): void {
	const{email, password} = this.logInForm.value;
	this.userDataService.signInEmail(email, password);
  }
  public resetPassword(): void {
	if (!this.logInForm.value.email) {
	  alert('Type in your email first');
	}
	this.userDataService.resetPasswordInit(this.logInForm.value.email)
	.then(
	  () => alert('A password reset link has been sent to your email address'),
	  (rejectionReason: any) => alert(rejectionReason))
	.catch((e: any) => alert('An error occurred while attempting to reset your password'));
  }
  }
