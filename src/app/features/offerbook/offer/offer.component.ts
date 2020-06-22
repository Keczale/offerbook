import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { OfferPopupComponent } from './offer-popup/offer-popup.component';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(OfferPopupComponent);
  }

}
