import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-offerbook',
  templateUrl: './offerbook.component.html',
  styleUrls: ['./offerbook.component.scss']
})
export class OfferbookComponent implements OnInit {

  constructor(
		public afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {}

}
