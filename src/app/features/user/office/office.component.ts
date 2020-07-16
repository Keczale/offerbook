import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { productCategories } from 'src/app/models/common';
import { userLocation } from 'src/app/models/common';

import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, OnDestroy {

	public userSubscriber: Subscription;
  public userType: string;

  public allCategories: string[] = productCategories;
  public checkedCategories: string[] = [];
  // public selectCategoriesForm: any[] = [];
  public newSelectedCategories: string[] = [];


  // public cities: string[];
  public allCities: string[] = userLocation;
  public checkedSellersCities: string[] = [];
  // public selectSellersCitiesForm: any[] = [];
  public newSelectedCities: string[] = [];

  public userId: string = '';

  public sendCategotiesTitle: string = 'Отправить выбранные категории';
  public clearTitle: string = 'Очистить список';
  public selectAllTitle: string = 'Выбрать все';
  public sendCityTitle: string = 'Отправить выбранные города';
  public step: number = 0;

  constructor (
  public userDataService: UserDataService,
  private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  this.userSubscriber = this.userDataService.currentUser$
  .subscribe((user: User) => {
  this.userType = user.userType;
  this.userId = user.id;
  if (user.sellerCategories) {
    this.checkedCategories = user.sellerCategories;
  }
  if (user.sellerLocation) {
    this.checkedSellersCities = user.sellerLocation;
  }
  // this.createCategoryForm(this.categories, this.checkedCategories);
  // this.createSellerCitiesForm(this.cities, this.checkedSellersCities);
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
	
}
