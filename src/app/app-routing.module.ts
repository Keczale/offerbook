import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/user/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
// import { AppComponent } from './app.component';
import { OfferbookComponent } from './features/offerbook/offerbook.component';
import { OfficeComponent } from './features/user/office/office.component';
// import { RequestComponent } from './features/offerbook/request/request.component';
// import { OfferComponent } from './features/offerbook/offer/offer.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectAuthorizedToLogin = () => redirectLoggedInTo(['/myrequests']);

const routes: Routes = [
  {
	path: 'login',
  component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAuthorizedToLogin }
  },
  {
	path: 'register',
	component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectAuthorizedToLogin }
  },
  {
    path: 'myaccount',
    component: OfficeComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
    },
  {
    path: '',
    redirectTo: 'myrequests',
    pathMatch: 'full'
  },
  {
	path: '',
  loadChildren: () => import ('./features/offerbook/offerbook.module').then((m) => m.OfferbookModule)
  },
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
