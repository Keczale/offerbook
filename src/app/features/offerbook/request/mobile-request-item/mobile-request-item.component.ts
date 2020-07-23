import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Request, RequestStatus } from 'src/app/models/request.model';

import { Router } from '@angular/router';
import { Offer } from 'src/app/models/offer.model';
import { RequestChangePopupComponent } from '../request-change-popup/request-change-popup.component';

@Component({
  selector: 'app-mobile-request-item',
  templateUrl: './mobile-request-item.component.html',
  styleUrls: ['./mobile-request-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileRequestItemComponent implements OnInit {

  @Input()
  public userRequest: Request;
  @Input()
  public index: number;

  public requestStatus: any = RequestStatus;
  public offersToRequest: Offer[] = null;
  public bestPrice: number = null;

  public offersQuantity: number = null;

  constructor(
		public requestService: RequestService,
		private _router: Router,
  ) { }

  ngOnInit(): void {
    if (!this.isEmpty(this.userRequest.offers)) {
			this.offersToRequest = Object.values(this.userRequest.offers)
			.sort((a: Offer, b: Offer) => a.price - b.price);
			this.bestPrice = this.offersToRequest[0].price;
			this.offersQuantity = this.offersToRequest.length;
		}
  }
  public isEmpty(obj){
		for(let key in obj){
			return false;
		}
		return true;
	}

  public changeRequest(changedRequest: Request): void {
		this.requestService.openMobileDialog(RequestChangePopupComponent, null);
		this.requestService.initChangeRequestAction(changedRequest);
	}

  public openOffers (id: string): void {
		this._router.navigate(['/myrequests', id]);
  }


}
