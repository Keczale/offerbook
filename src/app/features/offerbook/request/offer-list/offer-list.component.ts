import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Offer } from 'src/app/models/offer.model';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { Request } from 'src/app/models/request.model';
import { RequestService } from '../../services/request.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  private isOpened: boolean = false;

  public requestId: string = '';

  @Input()
  public offerList: Offer[] = [];

  public currentRequest: Request = null;


  constructor(
		private _activatedRoute: ActivatedRoute,
		private _requestFacade: RequestFacade,
		private _requestServise: RequestService
  ) { }

  ngOnInit(): void {
		this._activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params: Params) => {
			if (Boolean(params)) {
				this.requestId = params.id;
				}
		});
		this._requestFacade.isOpenedOfferList$.pipe(takeUntil(this.ngUnsubscribe))
		.subscribe((isOpened: boolean) => {
			this.isOpened = isOpened;
		});

		this._requestFacade.requestList$.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((requestList: Request[]) => {
				if (!Boolean(requestList.length) || !this.isOpened) {
					this._requestServise.simpleLoadActualList()
					.catch((error: Error) => console.log(error));
			}
			else {
				this.currentRequest = requestList.find((request: Request) => request.id === this.requestId);
				if (Boolean(this.currentRequest.offers)) {
					this.offerList = [];
					Object.values(this.currentRequest.offers).map((offer: Offer) => this.offerList.push(offer));
					this.offerSortPriceFromLow(this.offerList);
				}

			}
		});
		this._requestFacade.openOfferList();
  }
  ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
		this._requestFacade.closeOfferList();

  }
  public offerSortPriceFromLow(offerList: Offer[]): void {
		offerList.sort((a: Offer, b: Offer) => a.price - b.price);
  }
}
