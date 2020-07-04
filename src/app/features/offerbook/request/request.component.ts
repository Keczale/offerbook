import { Component, OnInit, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { RequestService } from '../services/request.service';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Request, RequestStatus } from 'src/app/models/request.model';

// import { Store, select } from '@ngrx/store';
// import { Subscriber } from 'rxjs';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public selectedRequest: Request = null;
  
  
  public requestList: Request[] = [];

  public requestListAll: Request[] = [];

  constructor(
    public dialog: MatDialog,
    public requestService: RequestService,
    public requestFacade: RequestFacade,

  ) { }

  ngOnInit(): void {
   //this.requestService.loadActualList();
    setTimeout(() => this.requestService.loadActualList(), 0);
    this.requestFacade.requestList$.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((requests: Request[]) => {
      this.requestList = requests;
      this.filterActive();
    })
  }


  ngOnDestroy(): void {
this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
  }
  
  public openDialog(): void {
    this.requestService.openDialog(RequestPopupComponent)
  }

  public filterAll(): void {
    this.requestFacade.setFilteredRequestList(this.requestList);
  }
  
  public filterActive(): void {
    const requests: Request[] = this.requestListAll.filter((request: Request) =>
      request.status === RequestStatus[0]);
    this.requestFacade.setFilteredRequestList(requests);
  }
  
  public filterCompleted(): void {
    const requests: Request[] = this.requestListAll.filter((request: Request) => 
      request.status === RequestStatus[1]);
    this.requestFacade.setFilteredRequestList(requests);
  }


}
