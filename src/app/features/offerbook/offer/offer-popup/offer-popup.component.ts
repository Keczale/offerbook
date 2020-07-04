import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-popup',
  templateUrl: './offer-popup.component.html',
  styleUrls: ['./offer-popup.component.scss']
})
export class OfferPopupComponent implements OnInit {
  private _imageMaxSize: number = 500000;
  public offerForm: FormGroup;
  constructor(
    public offerService: OfferService
    ) { }

  ngOnInit(): void {
  this.offerForm = new FormGroup({
  description : new FormControl('', Validators.required),
	conditions : new FormControl(''),
  price : new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
	secondHand : new FormControl(),
	offerImage : new FormControl(null, [ FileValidator.maxContentSize(this._imageMaxSize)] ),
	});
  }

  public submitForm(): void {
    this.offerService.submitOfferForm(this.offerForm.value);
    }

} 
