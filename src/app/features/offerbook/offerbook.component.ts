import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppFacade } from 'src/app/store/app/app.facade';

@Component({
  selector: 'app-offerbook',
  templateUrl: './offerbook.component.html',
  styleUrls: ['./offerbook.component.scss']
})
export class OfferbookComponent implements OnInit {

  constructor(
		public afAuth: AngularFireAuth,
		private _appFacade: AppFacade

  ) { }

  ngOnInit(): void {
		this._appFacade.setOfferbookModuleOpened();
	}

}
