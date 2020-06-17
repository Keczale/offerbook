import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  public userType: string;

  constructor(
  public userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
  this.userDataService.userType$.subscribe((userType: string) => this.userType = userType);
  }

  public addSeller(): void {
  this.userDataService.addSeller(this.userType);
  }

}
