import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferCategory } from 'src/app/core/models/offer/offer-category';
import { OfferCategoryControllerService } from 'src/app/core/services/offer/offer-category-controller.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoriesData: OfferCategory[] = [];
  target!: string;
  isThereData: boolean = false;

  constructor(
    private categoryService: OfferCategoryControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.target = this.route.snapshot.paramMap.get('target') || 'null';
    this.route.paramMap.subscribe((params) => {
      this.target = params.get('target') || 'null';
      this._fetchData(this._getTarget());
    });
    // this._fetchData(this._getTarget());
  }

  private _getTarget(): any {
    return this.target.toUpperCase() === 'PARTICULAR'
      ? 'PARTICULAR'
      : 'COMPANY';
  }

  private _fetchData(target: 'PARTICULAR' | 'COMPANY') {
    this.categoryService.getAllByTarget({ target }).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.categoriesData = data;
          this.isThereData = true;
        } else this.isThereData = false;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
