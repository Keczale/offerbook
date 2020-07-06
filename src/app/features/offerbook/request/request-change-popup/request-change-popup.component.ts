import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestDataService } from '../../services/request-data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { Subscription } from 'rxjs';
import { userLocation } from 'src/app/models/common';
import { RequestFacade } from 'src/app/store/request/request.facade';
import { Request } from 'src/app/models/request.model';

@Component({
  selector: 'app-request-change-popup',
  templateUrl: './request-change-popup.component.html',
  styleUrls: ['./request-change-popup.component.scss']
})
export class RequestChangePopupComponent implements OnInit, OnDestroy {

	private _requestSubscriber: Subscription;
  private _imageMaxSize: number = 500000;
  public requestChangeForm: FormGroup;
  public cityList: string[] = userLocation;

  public changedRequest: Request = null;

  constructor(
		public requestService: RequestService,
		public requestDataService: RequestDataService,
		public requestFacade: RequestFacade,
		private _fb: FormBuilder) { }

  ngOnInit(): void {
		this._requestSubscriber = this.requestFacade.changedRequest$.subscribe((request: Request) => this.changedRequest = request);
		this.requestChangeForm = this._fb.group({
			title : new FormControl(''),
			description : new FormControl(''),
			category : new FormControl(this.changedRequest.category),
			city : new FormControl(this.changedRequest.city),
			secondHand : new FormControl(this.changedRequest.secondHand),
			requestImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
		});
  }
  ngOnDestroy(): void {
		this._requestSubscriber.unsubscribe();
		}

  public submitForm(): void {
		this.requestService.submitChangeForm(this.requestChangeForm.value);
  }

  public cancelChanging(): void {
		this.requestService.cancelChanging();
  }
}
