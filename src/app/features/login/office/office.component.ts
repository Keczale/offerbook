import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';
import { productCategories } from 'src/app/models/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit, OnDestroy {

  public userType: string;
  public categories: string[];
  public checkedCategories: string[];
  public selectCategoriesForm = [];
  public  sellerCategoriesSubscription: Subscription;
  
  // public selectedCategories: string[] = [];


  constructor(
  public userDataService: UserDataService,
  private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.userDataService.userType$.subscribe((userType: string) => this.userType = userType);
  this.categories = productCategories;
  this.createCategoryForm(this.categories, this.checkedCategories);
  this.userDataService.sellerCategories$
  .subscribe(cat => this.checkedCategories = cat);
  console.log(this.checkedCategories)
  // console.log(this.categories);
  // console.log(this.selectCategoriesForm);
  }
  ngOnDestroy(): void {
  }
 

  public createCategoryForm(allCat: string[], checkedCat: string[]): void {

    allCat.map((item: any) =>
  {if (checkedCat) {checkedCat.includes(item) ?
  this.selectCategoriesForm.push({title: item, checked: true}) :
  this.selectCategoriesForm.push({title: item, checked: false})}
  else {this.selectCategoriesForm.push({title: item, checked: false})}
})

  console.log(this.selectCategoriesForm)
  }

  public sendCategories(): void {
  const arr: string[] = this.selectCategoriesForm.filter(category => category.checked)
  .map((category: any) => category = category.title);
  this.userDataService.setUserCategories(arr)

  }

  public addSeller(): void {
  this.userDataService.addSeller(this.userType);
  }

}
