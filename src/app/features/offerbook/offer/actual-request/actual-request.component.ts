import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Request, RequestStatus } from 'src/app/models/request.model';
import { OfferService } from '../../services/offer.service';
import { User } from 'src/app/models/user.model';
import { OfferDataService } from '../../services/offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { OfferPopupComponent } from '../offer-popup/offer-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { PhotoPopupComponent } from '../../../components/photo-popup/photo-popup.component';


@Component({
  selector: 'app-actual-request',
  templateUrl: './actual-request.component.html',
  styleUrls: ['./actual-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActualRequestComponent implements OnInit {

  @Input()
  public request: Request;

  public offerListForCounter: Offer[] = [];

  @Input()
  public index: Request = null;
 
  @Input()
  public buyer: User = null;

  @Input()
  public bestPrice: string = null;

  @Input()
  public currentUser: User = null;

  public offerToRequest: Offer = null;

  public offerStatus: any = OfferStatus;
  public requestStatusEnum: any = RequestStatus;

  @Input()
  public isHidden: boolean;

  constructor(
		public offerService: OfferService,
		private _offerDataService: OfferDataService,
		public userFacade: UserDataFacade,
		public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
	if (!this.offerService.isEmpty(this.request)) {

		if (this.request && Boolean(this.request.offers)) {
			const myOfferInArr: Offer[] = Object.values(this.request.offers).filter((offer: Offer) => offer.fromUserId === this.currentUser.id);
		if (Boolean(myOfferInArr.length)) {
			this.offerToRequest = Object.values(this.request.offers).filter((offer: Offer) => offer.fromUserId === this.currentUser.id)[0];
			}
		}
	}
  }

  public getBestPrice(): void {
		if (Boolean(!this.offerService.isEmpty(this.request))) {
		const offerList: Offer[] = Object.values(this.request.offers)
			.sort((a: Offer, b: Offer) => a.price - b.price);
			this.bestPrice = `Лучшая цена: ${offerList[0].price}`;
		}
  }

  public get isRequestRejected(): boolean {
    if(this.currentUser.sellerRejectedRequests) {
    return this.currentUser.sellerRejectedRequests.includes(this.request.id);
  }
  }

  public getOfferList(): void {
		if (this.request.offers && !this.offerService.isEmpty(this.request.offers)){
		this.offerListForCounter = Object.values(this.request.offers);
		}
  }


  public rejectRequest(): void {
		this.isHidden = true;
		this.userFacade.setRejectedRequest(this.request.id);
		this.offerService.setRequestListIsChanging();
		this.offerService.initCurrentFilter();
  }

  public openDialog() {
		this.dialog.open(OfferPopupComponent);
		this.offerService.setOpenedRequest(this.request);
  }

  public openPhoto(url: string): void {
		this.dialog.open(PhotoPopupComponent, {
			data: url
			});
  }

  
}
