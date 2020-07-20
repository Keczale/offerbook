import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Request, RequestStatus } from 'src/app/models/request.model';
import { OfferService } from '../../services/offer.service';
import { User, UserData } from 'src/app/models/user.model';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { OfferPopupComponent } from '../offer-popup/offer-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { PhotoPopupComponent } from '../../../components/photo-popup/photo-popup.component';
import { breakpoints } from 'src/app/models/common';


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
  public buyer: UserData = null;

  @Input()
  public bestPrice: string = null;

  @Input()
  public currentUser: User = null;

  @Input()
  public screenWidth: number = null;

  public offerToRequest: Offer = null;

  public offerStatus: any = OfferStatus;
  public requestStatusEnum: any = RequestStatus;

  @Input()
  public isHidden: boolean;
  

  constructor(
		public offerService: OfferService,
		// private _offerDataService: OfferDataService,
		public userFacade: UserDataFacade,
		public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
	if (!this.offerService.isEmpty(this.request)) {

		if (this.request && Boolean(this.request.offers)) {
			const myOfferInArr: Offer[] = Object.values(this.request.offers).filter((offer: Offer) => offer.fromUserId === this.currentUser.id);
		if (Boolean(myOfferInArr.length)) {
			this.offerToRequest = myOfferInArr[0];
			if (this.offerToRequest.status === this.offerStatus[1]) {
				this.getBuyerData();
				}
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
  public getBuyerData(): void {
		this.offerService.getBuyerData(this.request.fromUser)
		.then((buyerData: UserData) => this.buyer = buyerData);

	}
	public get buyerName(): string{
		if (this.buyer && this.buyer.name){
			return this.buyer.name
		}
		else if (this.request && this.request.fromUserName){
			return this.request.fromUserName
		}
	}


  public get isRequestRejected(): boolean {
		if (this.currentUser.sellerRejectedRequests && Boolean(this.currentUser.sellerRejectedRequests.length)) {
		return this.currentUser.sellerRejectedRequests.includes(this.request.id);
  }
  }

  // public getOfferList(): void {
	// 	if (this.request.offers && !this.offerService.isEmpty(this.request.offers)) {
	// 	this.offerListForCounter = Object.values(this.request.offers);
	// 	}
  // }


  public rejectRequest(): void {
		this.isHidden = true;
		this.userFacade.setRejectedRequest(this.request.id);
		this.offerService.setRequestListIsChanging();
		this.offerService.initCurrentFilter();
  }

  public openDialog(): void {
		if (this.screenWidth > breakpoints.mobile) {
			this.dialog.open(OfferPopupComponent, {
				height: 'auto',
				width: '50%',
			});
		}
		else {this.dialog.open(OfferPopupComponent, {
      height: 'auto',
      maxWidth: '90wv',
			width: '90%',
		});
  }
		this.offerService.setOpenedRequest(this.request);
  }

  public openPhoto(url: string): void {
		this.dialog.open(PhotoPopupComponent, {
			data: url
			});
  }

  
}
