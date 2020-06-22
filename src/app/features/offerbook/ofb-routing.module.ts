import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// import { RequestComponent } from './request/request.component';
// import { OfferComponent } from './offer/offer.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  // {
	// path: 'myrequests',
	// component: RequestComponent,
  // },
  // {
	// path: 'myoffers',
	// component: OfferComponent,
  // },
 
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OfbRoutingModule { }
