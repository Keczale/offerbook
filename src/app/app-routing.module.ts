import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/login/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AppComponent } from './app.component';
import { OfferbookComponent } from './features/offerbook/offerbook.component';
import { OfficeComponent } from './features/login/office/office.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
	path: 'login',
  component: LoginComponent,
  //children:[{
    //path: 'verifyemail',
    //component: VerifyEmailComponent,
  //}
  //]
  },
  {
	path: 'register',
	component: RegisterComponent
  },
  {
	path: '',
	component: OfferbookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
  path: 'myaccount',
  component: OfficeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
