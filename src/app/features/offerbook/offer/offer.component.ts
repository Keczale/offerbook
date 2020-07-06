import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
// import { OfferPopupComponent } from './offer-popup/offer-popup.component';
import { OfferService } from '../services/offer.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';
import { Subscription, Observable, combineLatest, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
import { OfferFacade } from 'src/app/store/offer/offer.facade';
import { Request } from 'src/app/models/request.model';
import { OfferFilterName } from 'src/app/models/offer.model';



@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public currentUser: User;
  public currentUserSubscriber: Subscription;
  public requestList: Request[];

  constructor(
		public offerService: OfferService,
		public userDataFacade: UserDataFacade,
		private cdRef: ChangeDetectorRef,
		public offerFacade: OfferFacade,
		) { }

  ngOnInit (): void {

		combineLatest(
			this.userDataFacade.sellerLocation$,
			this.userDataFacade.sellerCategory$)
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(([sellerLocation, sellerCategory]: [string[], string[]]) => {
				if (Boolean(sellerLocation) && Boolean(sellerCategory)) {
					this.userDataFacade.currentUser$.pipe(take(1))
					.subscribe((user: User) => {
					this.currentUser = user;
					this.offerService.loadActualList(this.currentUser);
					});
					this.offerFacade.offerRequestList$.pipe(takeUntil(this.ngUnsubscribe))
					.subscribe((offerRequestList: Request[]) => {
						this.requestList = offerRequestList;
						if (Boolean(offerRequestList.length)) {
							this.offerFacade.filteredRequestList$.pipe(take(1))
							.subscribe((filteredList: Request[]) => {
								if (!Boolean(filteredList.length)) {
									this.filterActive();
								}
							});
						}
					});
				}
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

  public filterAll(): void {
		this.offerService.filterAll();
  }

  public filterActive(): void {
		this.offerService.filterActive();
  }
  public filterRejected(): void {
		this.offerService.filterRejected();
  }

}
