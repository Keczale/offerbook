import { Component, OnInit } from '@angular/core';
import { AppFacade } from 'src/app/store/app/app.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
		private _appFacade: AppFacade
  ) { }

  ngOnInit(): void {
		this._appFacade.setLoginModuleOpened();
  }

}
