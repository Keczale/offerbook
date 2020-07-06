import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Request, RequestStatus } from 'src/app/models/request.model';
import { RequestService } from '../../services/request.service';
import { RequestChangePopupComponent } from '../request-change-popup/request-change-popup.component';
import { Offer } from 'src/app/models/offer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RequestItemComponent implements OnInit {
  
  public requestStatus: any = RequestStatus;
  
  @Input()
  public userRequest: Request;
  @Input()
  public index: number;

  public offersToRequest: Offer[] = null;
  public bestPrice: number = null;

  public offersQuantity: number = null;

  constructor(
    public requestService: RequestService,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    console.log(this.userRequest);
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
    this.requestService.openDialog(RequestChangePopupComponent);
    this.requestService.initChangeRequestAction(changedRequest);
	}
  
  

  public openOffers (id: string): void {
    this._router.navigate(['/myrequests', id]);
  }

}
