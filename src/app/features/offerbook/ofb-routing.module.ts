import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offer/offer.component';
import { OfferbookComponent } from './offerbook.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
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
  }]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfbRoutingModule { }
