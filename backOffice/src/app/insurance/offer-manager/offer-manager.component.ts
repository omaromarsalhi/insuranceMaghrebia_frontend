import { Component, OnInit } from "@angular/core";
import { OfferCategoryControllerService, OfferControllerService } from "src/app/core/services";
import { OfferCategory, OfferRequest } from "src/app/core/models";
import { OfferFormData } from "src/app/core/models/insurance/offer-form-data.interface";
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: "app-offer-manager",
  templateUrl: "./offer-manager.component.html",
  styleUrls: ["./offer-manager.component.scss"],
})
export class OfferManagerComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  categoriesData: OfferCategory[] = [];
  // offer: { data: OfferData; form: OfferFormData[] } = {
  //   data: null, 
  //   form: [], 
  // };
  offer: OfferRequest;
  private waiting2submitSubject = new BehaviorSubject<{
    offerData: boolean;
    offerFormData: boolean;
  }>({
    offerData: false,
    offerFormData: false,
  });
  waiting2submit$ = this.waiting2submitSubject.asObservable();

  constructor(
    private categoryService: OfferCategoryControllerService,
    private offerService: OfferControllerService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "offer" },
      { label: "create offer", active: true },
    ];

    this._fetchCategoryData();

    this.waiting2submit$.subscribe((value) => {
      if (value.offerData) {
        this.addOfferWithItsForm();
      }
    });
  }

  private addOfferWithItsForm() {
    console.log("saving ...")
    const parm={
      body: this.offer
    }
    this.offerService.createOffer(parm).subscribe({
      next: (response) =>{
        console.log(response);
      }
    })
  }

  recieveOfferData(data: OfferRequest) {

    this.offer = data;
    let olValue = this.waiting2submitSubject.value;
    olValue.offerData=true
    this.waiting2submitSubject.next(olValue)
    console.log(this.offer);
  }

  recieveOfferFormData(data: OfferFormData[]) {
    // this.offer.form = data;
    // let olValue = this.waiting2submitSubject.value;
    // olValue.offerFormData=true
    // this.waiting2submitSubject.next(olValue)
    // console.log(this.offer.form);
  }

  private _fetchCategoryData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoriesData = data;
      },
    });
  }
}
