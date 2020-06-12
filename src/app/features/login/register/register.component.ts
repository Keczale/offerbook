import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


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
	  private _auth: AngularFireAuth,
	  private _router: Router
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
	const{email, password}={email: this.registerForm.value.email, password: this.registerForm.value.password};
	this._auth.createUserWithEmailAndPassword(email, password).then(
		user=> {console.log(user);
		this._router.navigate(['']);
	});
}

}
