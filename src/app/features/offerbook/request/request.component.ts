import { Component, OnInit, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { RequestService } from '../services/request.service';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { takeUntil, take } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Request, RequestStatus, RequestFilterName } from 'src/app/models/request.model';

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

  //public requestListAll: Request[] = [];

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
      if(Boolean(requests.length)){
        this.requestList = requests;
        this.requestFacade.filteredRequestList$.pipe(take(1))
    .subscribe((filteredRequests: Request[]) => {
      if (Boolean(requests.length) && !Boolean(filteredRequests.length)) {
        this.filterActive();
      } 
    });

      }
      
    });
    console.log('init')

  }


  ngOnDestroy(): void {
this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
console.log('destroy')

  }
  
  public openDialog(): void {
    this.requestService.openDialog(RequestPopupComponent);
  }

  public filterAll(): void {
    this.requestService.filterAll();
}

  
  public filterActive(): void {
    this.requestService.filterActive();

  }
  
  public filterCompleted(): void {
    this.requestService.filterCompleted();
  }



}
