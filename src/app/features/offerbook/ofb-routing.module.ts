import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offer/offer.component';
import { OfferbookComponent } from './offerbook.component';
import { OfferListComponent } from './request/offer-list/offer-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
		path: '',
		component: OfferbookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },

  },
  {
	path: '',
	redirectTo: 'myrequests',
	pathMatch: 'full'
},
  {
	path: 'myrequests',
	component: RequestComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
},

{
	path: 'myrequests/:id',
	component: OfferListComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
	},
{
	path: 'myoffers',
	component: OfferComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
},
{
	path: '**',
	component: NotFoundComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
}

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfbRoutingModule { }
