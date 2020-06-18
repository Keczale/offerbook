import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';



import { LoginComponent } from './login.component';
import { EmailComponent } from './email/email.component';
import { GoogleComponent } from './google/google.component';
import { LastOffersComponent } from './last-offers/last-offers.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OfficeComponent } from './office/office.component';




@NgModule({
  declarations: [LoginComponent, EmailComponent, GoogleComponent, LastOffersComponent, RegisterComponent, OfficeComponent],
  imports: [
	CommonModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	RouterModule,
	ReactiveFormsModule,
	FormsModule,
	MatIconModule,
	MatCheckboxModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
