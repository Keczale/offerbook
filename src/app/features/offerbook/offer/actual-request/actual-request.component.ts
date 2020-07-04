import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { OfferService } from '../../services/offer.service';
import { User } from 'src/app/models/user.model';
import { OfferDataService } from '../../services/offer-data.service';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { setRejectedRequestAction } from 'src/app/store';
import { OfferPopupComponent } from '../offer-popup/offer-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-actual-request',
  templateUrl: './actual-request.component.html',
  styleUrls: ['./actual-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActualRequestComponent implements OnInit {

  @Input()
  public request: Request;

  @Input()
  public index: Request = null;

  public buyer: User = null;
  
  @Input()
  public isRemoved: boolean;
  
  constructor(
	public offerService: OfferService,
  private _offerDataService: OfferDataService,
  public userFacade: UserDataFacade,
  public dialog: MatDialog,


  ) { }

  ngOnInit(): void {
	// console.log(this.buyer, this.request.fromUser)
	if(this.request) {
	this._offerDataService.loadBuyerInfo(this.request.fromUser)
  .then((user: User) => {// console.log(user);
     this.buyer = user;})
	.catch((error: Error) => console.log(error));
	}
  }

  public rejectRequest(): void {
    this.isRemoved = true; // можно убрать(рендер от массива стора) - но так быстрее
    this.userFacade.setRejectedRequest(this.request.id);
    this.offerService.setRequestListIsChanging();
  }

  openDialog() {
    this.dialog.open(OfferPopupComponent);
    this.offerService.setOpenedRequest(this.request);
  }

  
}
