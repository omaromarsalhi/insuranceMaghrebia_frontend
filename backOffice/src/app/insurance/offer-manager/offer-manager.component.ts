import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferCategoryControllerService } from 'src/app/core/services';
import { OfferCategory } from 'src/app/core/models';
import { OfferData } from 'src/app/core/models/insurance/offer-data.interface';
import { OfferFormData } from 'src/app/core/models/insurance/offer-form-data.interface';

@Component({
  selector: 'app-offer-manager',
  templateUrl: './offer-manager.component.html',
  styleUrls: ['./offer-manager.component.scss']
})
export class OfferManagerComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  newOfferData :OfferData;
  newOfferFormData :OfferFormData[]= [];
  categoriesData: OfferCategory[] = [];

  constructor(private categoryService: OfferCategoryControllerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "offer" },
      { label: "create offer", active: true },
    ];

    this._fetchCategoryData()
  }

  recieveOfferData(data: OfferData) {
    this.newOfferData = data;
    console.log(this.newOfferData)
  }

  recieveOfferFormData(data: OfferFormData[]) {
    this.newOfferFormData = data;
    console.log(this.newOfferFormData)
  }

  private _fetchCategoryData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoriesData = data;
      }
    });
  }



}
