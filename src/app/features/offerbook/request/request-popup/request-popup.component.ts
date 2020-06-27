import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
// import { RequestDataService } from '../../services/request-data.service';
// import { HttpClient } from '@angular/common/http';
import { FileValidator } from 'ngx-material-file-input';
import { userLocation } from 'src/app/models/common';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})
export class RequestPopupComponent implements OnInit, OnDestroy {

	private _citySubscriber: Subscription;
  private _imageMaxSize: number = 500000;
  public requestForm: FormGroup;
  public cityList: string[] = userLocation;
  public userCity: string = null;


  constructor(
	public requestService: RequestService,
	//public offerbookDataService: RequestDataService,
	  public userDataFacade: UserDataFacade,
	private _fb: FormBuilder,
	// private _httpClient: HttpClient
	) {   }

  ngOnInit(): void {
	this._citySubscriber = this.userDataFacade.userLocation$.subscribe((city: string) => this.userCity = city);
	this.requestForm = this._fb.group({
	title : new FormControl('', Validators.required),
	description : new FormControl('', Validators.required),
	category : new FormControl('', Validators.required),
	city : new FormControl(this.userCity, Validators.required),
	secondHand : new FormControl(),
	requestImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
	});
  }
  ngOnDestroy(): void {
	this._citySubscriber.unsubscribe()
  }
  // uploadFile(event) {
  //   const file: File = (event.target as HTMLInputElement).files[0];
  //   this.requestForm.patchValue({
  //     requestImage: file
  //   });
  //   this.requestForm.get('requestImage').updateValueAndValidity()
  // }

  public submitForm(): void {
	this.requestService.submitForm(this.requestForm.value);
  }

}
