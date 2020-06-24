import { Component, OnInit } from '@angular/core';
import { OfferbookService } from '../../services/offerbook.service';
import { OfferbookDataService } from '../../services/offerbook-data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-request-change-popup',
  templateUrl: './request-change-popup.component.html',
  styleUrls: ['./request-change-popup.component.scss']
})
export class RequestChangePopupComponent implements OnInit {
  
  private _imageMaxSize: number = 500000;
  public requestChangeForm: FormGroup;

  constructor(
    public offerbookService: OfferbookService,
    public offerbookDataService: OfferbookDataService,
    private _fb: FormBuilder,) { }

  ngOnInit(): void {
    this.requestChangeForm = this._fb.group({
      title : new FormControl(''),
      description : new FormControl(''),
      category : new FormControl(''),
      requestImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
      });
  }

  public submitForm(): void {
    this.offerbookService.submitChangeForm(this.requestChangeForm.value);
  }
}
