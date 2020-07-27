import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { productCategories } from 'src/app/models/common';
import { userLocation } from 'src/app/models/common';

import { User, UserData, UserTypes } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { UserDataFacade } from 'src/app/store/userData/user-data.facade';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, OnDestroy {

	private _user: User = null;
	private _userName: string = '';
	private _userAdress: string = '';
	private _userTelephone: string = '';
	private _imageMaxSize: number = 5000000;
	public userDataForm: FormGroup;
	public userTypes: any = UserTypes;

	public userSubscriber: Subscription;
  public userType: string;

  public allCategories: string[] = productCategories;
  public checkedCategories: string[] = [];
  public newSelectedCategories: string[] = [];

  public allCities: string[] = userLocation;
  public checkedSellersCities: string[] = [];
  public newSelectedCities: string[] = [];

  public userId: string = '';

  public sendCategotiesTitle: string = 'Отправить выбранные категории';
  public clearTitle: string = 'Очистить список';
  public selectAllTitle: string = 'Выбрать все';
  public sendCityTitle: string = 'Отправить выбранные города';
	public step: number = 0;
	public get userName(): string {
		if (Boolean (this._userName)) {
			return this._userName;
		}
		else if (Boolean(this._user.userName)) {
			return this._user.userName;
		}
	}


  constructor (
	public userDataService: UserDataService,
	private _userDataFacade: UserDataFacade,
	private _snackBar: MatSnackBar,
	private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.userSubscriber = this.userDataService.currentUser$
  .subscribe((user: User) => {
	this._user = user;
  this.userType = user.userType;
	this.userId = user.id;
	if (user.userData) {
		if (Boolean (user.userData.name)) {
			this._userName = user.userData.name;
		}
		if (Boolean (user.userData.adress)) {
			this._userAdress = user.userData.adress;
		}
		if (Boolean (user.userData.telephone)) {
			this._userTelephone = user.userData.telephone;
		}
	}
  if (user.sellerCategories) {
		this.checkedCategories = user.sellerCategories;
  }
  if (user.sellerLocation) {
		this.checkedSellersCities = user.sellerLocation;
	}
	this.userDataForm = this._fb.group({
		name : [`${this.userName}`],
		// surname : [''],
		telephone : [`${this._userTelephone}`],
		adress : [`${this._userAdress}`],
		// userImage : [null, [ FileValidator.maxContentSize(this._imageMaxSize)] ],
		});
	});

  }

  ngOnDestroy(): void {
  this.userSubscriber.unsubscribe();
  }
	public setStep (index: number): void {
		this.step = index;
  }
  public nextStep(): void {
		this.step++;
  }



  public onCategorySelection(event: any): void {
		this.newSelectedCategories = event.option.selectionList._value;
  }
  public onCitySelection(event: any): void {
		this.newSelectedCities = event.option.selectionList._value;
  }

  
  public sendCategories(): void {
		const arr: string[] = this.newSelectedCategories;
		if (Boolean(arr.length)) {
			this.userDataService.setUserCategories(arr);
			this._snackBar.open('Ваши категории сохранены!', '', {
				duration: 2000,
			});
		}
		else {this._snackBar.open('Вы ничего не выбрали :)', '', {
			duration: 2000,
		});
  }
		this.nextStep();
  }

  public addSeller(): void {
  this.userDataService.addSeller(this.userType);
  this.userType === 'seller' ?
  this._snackBar.open('Теперь вы можете продавать! Настройте аккаунт.', '', {
		duration: 2000,
  }) :
  this._snackBar.open('Изменения сохранены', '', {
		duration: 2000,
  });
  }

  
  public sendSellersCities(): void {
		const arr: string[] = this.newSelectedCities;
		if (Boolean(arr.length)) {
			this.userDataService.setSellerCities(arr);
			this._snackBar.open('Настройки локации сохранены!', '', {
				duration: 2000,
			});
		}
		else {this._snackBar.open('Вы ничего не выбрали :)', '', {
			duration: 2000,
		});
  }
		this.nextStep();
  }


  public selectAllCategories(): void {
		this.newSelectedCategories = this.allCategories;
  }
  public deselectAllCategories(): void {
		this.newSelectedCategories = [];
  }
  public selectAllCities(): void {
		this.newSelectedCities = this.allCities;
  }
  public deselectAllCities(): void {
		this.newSelectedCities = [];
  }

	public submitUserDataForm(): void {
		const userData: UserData = {
			name: this.userDataForm.value.name,
			telephone: this.userDataForm.value.telephone,
			adress: this.userDataForm.value.adress
		};
		this._userDataFacade.setUserData(userData);
		this.userDataService.userToDataBase();
		this._snackBar.open ('Сохранено!', '', {
			duration: 2000,
		});
	}

	public get isDisabled(): boolean {
		return this._userName === this.userDataForm.value.name &&
		this._userAdress === this.userDataForm.value.adress &&
		this._userTelephone === this.userDataForm.value.telephone;
	}
}
