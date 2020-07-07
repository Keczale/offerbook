import { Component, OnInit } from '@angular/core';
import { userLocation } from 'src/app/models/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/features/user/services/user-data.service';


@Component({
  selector: 'app-popup-location',
  templateUrl: './popup-location.component.html',
  styleUrls: ['./popup-location.component.scss']
})
export class PopupLocationComponent implements OnInit {

  public cityList: string[] = userLocation;

  public locationForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    this.locationForm = this._fb.group({
      city: new FormControl(userLocation[1], Validators.required),
      });
  }

  public submitForm(): void {
    this._userDataService.setUserLocation(this.locationForm.value.city)
  }

}
