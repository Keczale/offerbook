import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { OfferPopupComponent } from './offer-popup/offer-popup.component';
import { OfferService } from '../services/offer.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Subscription, Observable, combineLatest, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {


  // public rejectedRequests: string[];

  public currentUser: User;
  public currentUserSubscriber: Subscription;
  

  private ngUnsubscribe: Subject<void> = new Subject<void>();




  constructor(
    public offerService: OfferService,
    public userDataFacade: UserDataFacade,
    private cdRef: ChangeDetectorRef

    ) { }

  ngOnInit(): void {
    combineLatest(
      this.userDataFacade.sellerLocation$,
      this.userDataFacade.sellerCategory$)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((all) => {
        this.userDataFacade.currentUser$
        .subscribe((user: User) => {
        this.currentUser = user;
        this.offerService.loadActualList(this.currentUser);
        })
        .unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
     }

  

  public saveRejectedRequests(): void {
    this.offerService.saveRejectedRequests();
  }

  public refreshRequestList(): void {
    this.offerService.refreshRequestList();
  }
}
