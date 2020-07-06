import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestPopupComponent } from '../request-popup/request-popup.component';

@Component({
  selector: 'app-button-wrap',
  templateUrl: './button-wrap.component.html',
  styleUrls: ['./button-wrap.component.scss']
})
export class ButtonWrapComponent implements OnInit {

  constructor(		public requestService: RequestService,
    ) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
		this.requestService.openDialog(RequestPopupComponent);
  }

}
