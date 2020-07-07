import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { RequestPopupComponent } from './request-popup/request-popup.component';
import { RequestService } from '../services/request.service';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { takeUntil, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Request } from 'src/app/models/request.model';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, OnDestroy, AfterViewChecked {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public selectedRequest: Request = null;

  public requestList: Request[];

  // just with ngFor matDialog working correctly after page reloading
  public arr: number[] = [1];

  constructor(
		public requestService: RequestService,
		public requestFacade: RequestFacade,
		private _userFacade: UserDataFacade,
	  private cdRef: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
		this._userFacade.currentUser$.pipe(takeUntil(this.ngUnsubscribe))
		.subscribe((user: User) => {
			if (user && Boolean(user.id)) {
				this.requestService.loadActualList(); //убрал нулувой setTimeout
				this.ngUnsubscribe.next();
				this.ngUnsubscribe.complete();
			}
		});
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
			else if (Boolean(requests) && !Boolean(requests.length)) {
				setTimeout(() => this.requestList = [], 2000);
			}
 });
}
ngAfterViewChecked(): void {
  this.cdRef.detectChanges();
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
