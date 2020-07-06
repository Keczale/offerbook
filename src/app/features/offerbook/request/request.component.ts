import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { RequestService } from '../services/request.service';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Request } from 'src/app/models/request.model';



@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public selectedRequest: Request = null;

  public requestList: Request[] = [];

  // just with ngFor matDialog working correctly after page reloading
  public arr: number[] = [1];

  constructor(
		public requestService: RequestService,
		public requestFacade: RequestFacade,

  ) { }

  ngOnInit(): void {
		setTimeout(() => this.requestService.loadActualList(), 0);
		this.requestFacade.requestList$.pipe(takeUntil(this.ngUnsubscribe))
		.subscribe((requests: Request[]) => {
			if (Boolean(requests.length)) {
				this.requestList = requests;
				this.requestFacade.filteredRequestList$.pipe(take(1))
		.subscribe((filteredRequests: Request[]) => {
		if (Boolean(requests.length) && !Boolean(filteredRequests.length)) {
		this.filterActive();
			}
		});
   }
 });
}

  ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
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
