import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/user/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AppComponent } from './app.component';
import { OfferbookComponent } from './features/offerbook/offerbook.component';
import { OfficeComponent } from './features/user/office/office.component';
import { RequestComponent } from './features/offerbook/request/request.component';
import { OfferComponent } from './features/offerbook/offer/offer.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
	path: 'login',
  component: LoginComponent,
  },
  {
	path: 'register',
	component: RegisterComponent
  },
  // {
	// path: '',
  // component: OfferbookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
  // redirectTo: 'myrequests',
  // pathMatch: 'full'
  // },
  {
	path: '',
  component: OfferbookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
  children:[{
	path: 'myrequests',
	component: RequestComponent,
  },
  {
	path: 'myoffers',
	component: OfferComponent,
  },
  ],
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
