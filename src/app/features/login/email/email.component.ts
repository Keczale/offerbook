import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { UserState, inProgressAction } from 'src/app/store';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public logInForm: FormGroup;

  constructor(
	private _fbAuth: AngularFireAuth,
	private _fb: FormBuilder,
	private _router: Router,
	public dataService: DataService,
	private _store$: Store<UserState>
	) { }

  ngOnInit(): void {
	this.logInForm = this._fb.group({
	email : new FormControl('', [Validators.required, Validators.email]),
	password : new FormControl('', Validators.required),
	});
  }

  public signIn(): void {
	this.dataService.loading();
	const{email, password} = this.logInForm.value;
	this._fbAuth.signInWithEmailAndPassword(email, password)
		.then(() => this._router.navigate(['']), () => this.dataService.loading())
		.then(() => this.dataService.loading());

	}
  }
