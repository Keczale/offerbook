import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { RequestService } from '../../services/request.service';
import { Request } from 'src/app/models/request.model';
import { MatDialog } from '@angular/material/dialog';
import { PhotoPopupComponent } from '../../../components/photo-popup/photo-popup.component';


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

  public offerStatus = OfferStatus;

  public accepted: string = OfferStatus[1];
  public rejected: string = OfferStatus[2];

  constructor(
    private _requestService: RequestService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void { }

  public acceptOffer(): void {
    // this.dialog.open(OfferPopupComponent);
    this._requestService.acceptOffer(this.currentRequest, this.currentOffer);
  }

  public openPhoto(url: string): void {
		this.dialog.open(PhotoPopupComponent, {
			data: url
			});
  }

}
