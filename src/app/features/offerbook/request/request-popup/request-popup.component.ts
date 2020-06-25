import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestDataService } from '../../services/request-data.service';
// import { HttpClient } from '@angular/common/http';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})
export class RequestPopupComponent implements OnInit {

  private _imageMaxSize: number = 500000;
  public requestForm: FormGroup;

  constructor(
    public offerbookService: RequestService,
    public offerbookDataService: RequestDataService,

    private _fb: FormBuilder,
    // private _httpClient: HttpClient
    ) {   }

  ngOnInit(): void {
    this.requestForm = this._fb.group({
      title : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      category : new FormControl('', Validators.required),
      requestImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
      });
  }
  // uploadFile(event) {
  //   const file: File = (event.target as HTMLInputElement).files[0];
  //   this.requestForm.patchValue({
  //     requestImage: file
  //   });
  //   this.requestForm.get('requestImage').updateValueAndValidity()
  // }

  public submitForm(): void {
    this.offerbookService.submitForm(this.requestForm.value)
  }

}
