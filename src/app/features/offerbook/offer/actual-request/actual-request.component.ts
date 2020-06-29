import { Component, OnInit, Input } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { OfferService } from '../../services/offer.service';
import { User } from 'src/app/models/user.model';
import { OfferDataService } from '../../services/offer-data.service';


@Component({
  selector: 'app-actual-request',
  templateUrl: './actual-request.component.html',
  styleUrls: ['./actual-request.component.scss']
})
export class ActualRequestComponent implements OnInit {

  @Input()
  public request: Request;

  @Input()
  public index: Request;

  public buyer: User = null;

  constructor(
	public offerService: OfferService,
	private _offerDataService: OfferDataService,


  ) { }

  

  ngOnInit(): void {
	console.log(this.buyer, this.request.fromUser)
	if(this.request){
	this._offerDataService.loadBuyerInfo(this.request.fromUser)
	.then((user: User) => {console.log(user); this.buyer = user;})
	.catch((error: Error) => console.log(error));
	}
  }

}
