import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { OfferbookService } from '../services/offerbook.service';
// import { Store, select } from '@ngrx/store';
// import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    public offerbookService: OfferbookService,
  ) { }

  ngOnInit(): void {
    this.offerbookService.loadActualList()
  }
  
  public openDialog(): void {
    this.offerbookService.openDialog(RequestPopupComponent)
  }

}
