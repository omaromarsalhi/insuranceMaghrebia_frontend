import { Component, OnInit, ViewChild } from '@angular/core';
import { FormCreatorComponent } from '../form-creator/form-creator.component';
import { OfferCreatorComponent } from '../offer-creator/offer-creator.component';

@Component({
  selector: 'app-offer-manager',
  templateUrl: './offer-manager.component.html',
  styleUrls: ['./offer-manager.component.scss']
})
export class OfferManagerComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  userData: { name: string, age: number } = { name: '', age: 0 };

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "offer" },
      { label: "create offer", active: true },
    ];
  }


  recieve(data: { name: string, age: number }) {
    this.userData = data;
    console.log(this.userData)
  }

}
