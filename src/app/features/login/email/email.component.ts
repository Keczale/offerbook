import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public logInForm: FormGroup;

  constructor(
	private _auth: AngularFireAuth,
	private _fb: FormBuilder,
	private _router: Router
	) { }

  ngOnInit(): void {
	this.logInForm = this._fb.group({
	email : new FormControl('', [Validators.required, Validators.email]),
	password : new FormControl('', Validators.required),
	});
  }

  public signIn(): void {
	const{email, password}=this.logInForm.value;
	this._auth.signInWithEmailAndPassword(email, password).then(
		user=> {console.log(user);
		this._router.navigate(['']);
	});
  }
}
