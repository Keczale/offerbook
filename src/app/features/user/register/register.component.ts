import { Component, OnInit, Inject, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public minPasswordLength: number = 6;

  constructor(
	  private _fb: FormBuilder,
	  public userDataServise: UserDataService,
	  ) { }

  	ngOnInit(): void {
	this.registerForm = this._fb.group({
		name : new FormControl('', Validators.required),
		email : new FormControl('', [Validators.required, Validators.email]),
		password : new FormControl('', [Validators.required, Validators.minLength(this.minPasswordLength)]),
	});
	}

	ngOnDestroy(): void {}

  public checkPasswords(group: FormGroup): any { // here we have the 'passwords' group
  	const pass: string = group.get('password').value;
  	const confirmPass: string = group.get('confirmPass').value;
  	return pass === confirmPass ? null : { notSame: true };
}
public createUser(): void {
	const{name, email, password} = {name: this.registerForm.value.name, email: this.registerForm.value.email, password: this.registerForm.value.password};
	this.userDataServise.createUser(name, email, password);
}
}
