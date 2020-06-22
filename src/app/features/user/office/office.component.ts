import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { productCategories } from 'src/app/models/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import {MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, OnDestroy {

	public userSubscriber: Subscription;
  public userType: string;
  public categories: string[];
  public checkedCategories: string[];
  public selectCategoriesForm = [];

  public sendCategotiesTitle = 'Отправить выбранные категории';
  public clearTitle = 'Очистить список';
  // public selectedCategories: string[] = [];


  constructor(
  public userDataService: UserDataService,
  private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
	this.categories = productCategories;
  this.userSubscriber = this.userDataService.currentUser$
  .subscribe((user: User) => {
  this.userType = user.userType;
  this.checkedCategories = user.sellerCategories;
  this.createCategoryForm(this.categories, this.checkedCategories);
  });

  
//   .subscribe((cat: string[]) => this.checkedCategories = cat);
  }
  ngOnDestroy(): void {
  this.userSubscriber.unsubscribe();
//   this._sellerCategoriesSub.unsubscribe();
  }
 

  public createCategoryForm(allCat: string[], checkedCat: string[]): void {
    this.selectCategoriesForm = [];
    allCat.map((item: any) => {
  	if (checkedCat) {checkedCat.includes(item) ?
	  this.selectCategoriesForm.push({title: item, checked: true}) :
	  this.selectCategoriesForm.push({title: item, checked: false});
	  } else {this.selectCategoriesForm.push({title: item, checked: false});
  }});
  }
  public clearsSelectedCategories(): void {
    this.selectCategoriesForm = [];
    this.categories.map( item => this.selectCategoriesForm.push({title: item, checked: false}))
  }


  public sendCategories(): void {
  	const arr: string[] = this.selectCategoriesForm.filter((category: any) => category.checked)
  	.map((category: any) => category = category.title);
    this.userDataService.setUserCategories(arr);
    this._snackBar.open('Ваши категории изменены', '', {
      duration: 2000,
    });
  }

  public addSeller(): void {
  this.userDataService.addSeller(this.userType);
  this.userType === 'seller' ?
  this._snackBar.open('Теперь вы можете продавать! Выберите категории.', '', {
    duration: 2000,
  }) :
  this._snackBar.open('Изменения сохранены', '', {
    duration: 2000,
  });
  }

}
