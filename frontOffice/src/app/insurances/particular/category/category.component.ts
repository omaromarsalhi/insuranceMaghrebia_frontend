import { Component, OnInit } from '@angular/core';
import { OfferCategory } from 'src/app/core/models';
import { OfferCategoryControllerService } from 'src/app/core/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoriesData: OfferCategory[] = [];


  constructor(
    private categoryService: OfferCategoryControllerService,
  ) {}

  ngOnInit(){
    this._fetchData()
  }

  private _fetchData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoriesData = data;
        console.log(this.categoriesData)
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }

}
