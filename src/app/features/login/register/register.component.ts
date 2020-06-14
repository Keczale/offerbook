import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { UserState, inProgressAction } from 'src/app/store';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public minPasswordLength: number = 6;

  constructor(
	  private _fb: FormBuilder,
	  private _fbAuth: AngularFireAuth,
	  private _router: Router,
	  public dataService: DataService,
	  private _store$: Store<UserState>
	  ) { }

  ngOnInit(): void {
	this.registerForm = this._fb.group({
		name : new FormControl('', Validators.required),
		email : new FormControl('', [Validators.required, Validators.email]),
		password : new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]),
		//confirmPassword : new FormControl('', [Validators.required,]),
	});

  }
  public checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
  	const pass: string = group.get('password').value;
  	const confirmPass: string = group.get('confirmPass').value;
  	return pass === confirmPass ? null : { notSame: true };
}
public createUser(): void {
	this.dataService.loading();
	const{name, email, password} = {name: this.registerForm.value.name, email: this.registerForm.value.email, password: this.registerForm.value.password};
	this._fbAuth.createUserWithEmailAndPassword(email, password)
	.then(() => this._router.navigate(['']), () => this.dataService.loading())
	.then(() => this.dataService.loading());
	this._fbAuth.authState.subscribe(data => {data.displayName = name; console.log(data.displayName)});
	}
}
