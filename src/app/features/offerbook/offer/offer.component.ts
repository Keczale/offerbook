import { Component, OnInit, OnDestroy } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { OfferPopupComponent } from './offer-popup/offer-popup.component';
import { OfferService } from '../services/offer.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  public currentUser: User;
  public currentUserSubscriber: Subscription;


  constructor(
    public dialog: MatDialog,
    public offerService: OfferService,
    private _userDataFacade: UserDataFacade
    ) { }

  ngOnInit(): void {
    this.currentUserSubscriber = this._userDataFacade.currentUser$
    .subscribe((user: User) => {
      if(user){
      this.currentUser = user;
      this.offerService.loadActualList(this.currentUser);
      console.log(this.currentUser); }
    });

  }

  ngOnDestroy(): void {
    	this.currentUserSubscriber.unsubscribe();
    }

  openDialog() {
    this.dialog.open(OfferPopupComponent);
  }


}
