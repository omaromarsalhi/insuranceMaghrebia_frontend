import { Component, OnInit } from "@angular/core";

import { OfferControllerService } from "src/app/core/services";
import { OfferResponse } from "src/app/core/models";

@Component({
  selector: "app-offer-view",
  templateUrl: "./offer-view.component.html",
  styleUrls: ["./offer-view.component.scss"],
})
export class OfferViewComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  offersList:OfferResponse[]=[];
  isLoding: boolean = false;

  constructor(private offerService: OfferControllerService) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Offers" },
      { label: "Offers List", active: true },
    ];
    this._fetchData();
  }

  private _fetchData() {
    this.offerService.getAll().subscribe((response: OfferResponse[]) => {
      console.log(response)
      this.offersList=response;
    });
  }
}
