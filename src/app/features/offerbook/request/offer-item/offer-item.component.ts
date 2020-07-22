import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { RequestService } from '../../services/request.service';
import { Request } from 'src/app/models/request.model';
import { MatDialog } from '@angular/material/dialog';
import { PhotoPopupComponent } from '../../../components/photo-popup/photo-popup.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { rateSelection } from 'src/app/models/user.model';


@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class OfferItemComponent implements OnInit {

  @Input()
  public currentOffer: Offer;

  @Input()
  public currentRequest: Request;

  @Input()
	public index: number;
	
	@Input()
	public rateIsDisabled: boolean = false;


  public offerStatus = OfferStatus;

  public accepted: string = OfferStatus[1];
  public rejected: string = OfferStatus[2];

  public panelOpenState: boolean = false;

  public sellerRateForm: FormGroup;

	public ratesArr: any = rateSelection;
	

  constructor(
		private _requestService: RequestService,
		private _fb: FormBuilder,
		public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
		this.sellerRateForm = this._fb.group({
			rate: [null],
			comment: ['']
		});

  }

  public acceptOffer(): void {
		// this.dialog.open(OfferPopupComponent);
		this._requestService.acceptOffer(this.currentRequest, this.currentOffer);
  }

  public openPhoto(url: string): void {
		this.dialog.open(PhotoPopupComponent, {
			data: url
			});
  }
  public submitSellerRateForm(): void {
		this._requestService.submitSellerRateForm (this.sellerRateForm.value,	this.currentRequest.id,
			this.currentRequest.title, this.currentOffer.fromUserId, this.currentRequest);
		this.rateIsDisabled = true;
  }

}
