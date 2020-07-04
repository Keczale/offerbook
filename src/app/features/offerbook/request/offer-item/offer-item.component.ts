import { Component, OnInit, Input } from '@angular/core';
import { Offer, OfferStatus } from 'src/app/models/offer.model';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.scss']
})
export class OfferItemComponent implements OnInit {

  @Input()
  public currentOffer: Offer;

  @Input()
  public currentRequest: Offer;

  @Input()
  public index: number;

  public accepted: string = OfferStatus[1];
  public rejected: string = OfferStatus[2];

  constructor(
    private _requestService: RequestService,
  ) { }

  ngOnInit(): void { }

  public acceptOffer(): void {
    // this.dialog.open(OfferPopupComponent);
    this._requestService.acceptOffer(this.currentRequest, this.currentOffer);
  }

}
