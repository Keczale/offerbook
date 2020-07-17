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
	


  constructor (
	public userDataService: UserDataService,
	private _userDataFacade: UserDataFacade,
	private _snackBar: MatSnackBar,
	private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.userSubscriber = this.userDataService.currentUser$
  .subscribe((user: User) => {
  this.userType = user.userType;
	this.userId = user.id;
	if(user.userData){
		if(user.userData.name){
			this._userName = user.userData.name;
		}
		if(user.userData.adress){
			this._userAdress = user.userData.adress;
		}
		if(user.userData.telephone){
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
		name : [`${this._userName}`],
		// surname : [''],
		telephone : [`${this._userTelephone}`, Validators.pattern('[0-9]+')],
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

  // public createCategoryForm(allCat: string[], checkedCat: string[]): void {
	// 	this.selectCategoriesForm = [];
	// 	allCat.map((item: any) => {
  // 	if (checkedCat) {checkedCat.includes(item) ?
	//   this.selectCategoriesForm.push({title: item, checked: true}) :
	//   this.selectCategoriesForm.push({title: item, checked: false});
	//   } else {this.selectCategoriesForm.push({title: item, checked: false});
  // }});
  // }

  public onCategorySelection(event: any): void {
		this.newSelectedCategories = event.option.selectionList._value;
  }
  public onCitySelection(event: any): void {
		this.newSelectedCities = event.option.selectionList._value;
  }

  // public clearsSelectedCategories(): void {
	// 	this.selectCategoriesForm = [];
	// 	this.categories.map( (item: string) => this.selectCategoriesForm.push({title: item, checked: false}));
  // }

  // public sendCategories(): void {
  // 	const arr: string[] = this.selectCategoriesForm.filter((category: any) => category.checked)
  // 	.map((category: any) => category = category.title);
	// 	this.userDataService.setUserCategories(arr);
	// 	this._snackBar.open('Ваши категории сохранены!', '', {
	// 		duration: 2000,
	// 	});
	// 	this.nextStep();
  // }
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

  // public createSellerCitiesForm(allCities: string[], checkedCities: string[]): void {
	// 	this.selectSellersCitiesForm = [];
	// 	allCities.map((city: string) => {
  // 	if (checkedCities) {checkedCities.includes(city) ?
	//   this.selectSellersCitiesForm.push({title: city, checked: true}) :
	//   this.selectSellersCitiesForm.push({title: city, checked: false});
	//   } else {this.selectSellersCitiesForm.push({title: city, checked: false});
  // }});
  // }
  // public clearsSelectedCities(): void {
	// 	this.selectSellersCitiesForm = [];
	// 	this.cities.map( (city: string) => this.selectSellersCitiesForm.push({title: city, checked: false}))
  // }
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
  // public sendSellersCities(): void {
  // 	const cities: string[] = this.selectSellersCitiesForm.filter((city: any) => city.checked)
  // 	.map((city: any) => city = city.title);
	// 	this.userDataService.setSellerCities(cities);
	// 	this._snackBar.open('Настройки локации сохранены!', '', {
	// 		duration: 2000,
	// 	});
	// 	this.nextStep();
  // }

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
