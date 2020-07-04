import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { RequestComponent } from './request/request.component';
import { OfferComponent } from './offer/offer.component';
import { OfferbookComponent } from './offerbook.component';
import { OfferListComponent } from './request/offer-list/offer-list.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    component: OfferbookComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },

    children: [{
    path: 'myrequests',
    component: RequestComponent,
  },
  {
    path: 'myrequests/:id',
    component: OfferListComponent,
    // children: [
    //   {path: 'offers',
    //   component: OfferListComponent}
    // ]
    },
  {
    path: 'myoffers',
    component: OfferComponent,
  }]
  },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfbRoutingModule { }
