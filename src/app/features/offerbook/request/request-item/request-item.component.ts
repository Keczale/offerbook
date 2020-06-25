import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Request } from 'src/app/models/request.model';
import { RequestService } from '../../services/request.service';
import { RequestChangePopupComponent } from '../request-change-popup/request-change-popup.component';


@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RequestItemComponent implements OnInit {
  
  
  @Input()
  public userRequest: Request;

  constructor(
    public offerbookService: RequestService,
  ) { }

  ngOnInit(): void {
  }

  public changeRequest(changedRequest): void {
    this.offerbookService.openDialog(RequestChangePopupComponent);
    this.offerbookService.initChangeRequestAction(changedRequest)
	}
  

}
