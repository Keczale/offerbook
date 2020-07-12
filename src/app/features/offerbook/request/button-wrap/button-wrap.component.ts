import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestPopupComponent } from '../request-popup/request-popup.component';
import { breakpoints } from 'src/app/models/common';
import { AppFacade } from 'src/app/store/app/app.facade';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-button-wrap',
  templateUrl: './button-wrap.component.html',
  styleUrls: ['./button-wrap.component.scss']
})
export class ButtonWrapComponent implements OnInit, OnDestroy {

private _ngUnsubscribe: Subject<void> = new Subject<void>();
@Input()
public screenWidth: number;

constructor(
		public requestService: RequestService,
		private _appFacade: AppFacade,
		) { }

  ngOnInit(): void {
		this._appFacade.screenWidth$.pipe(takeUntil(this._ngUnsubscribe))
		.subscribe((width: number) => this.screenWidth = width);
	  }

  ngOnDestroy(): void {
		this._ngUnsubscribe.next();
		this._ngUnsubscribe.complete();
  }

  public openDialog(): void {
		if (this.screenWidth > breakpoints.mobile) {
			this.requestService.openDialog(RequestPopupComponent);
		}
		else{this.requestService.openMobileDialog(RequestPopupComponent);
		}
  }

}
