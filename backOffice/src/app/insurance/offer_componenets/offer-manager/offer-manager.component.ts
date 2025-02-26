import { Component, OnInit ,ViewChild} from "@angular/core";
import { OfferCategoryControllerService, OfferControllerService } from "src/app/core/services";
import { FilteredCategoryDto, OfferCategory, OfferRequest } from "src/app/core/models";
import { BehaviorSubject, of } from 'rxjs';
import { OfferFormData } from "src/app/core/models/offer-form-data.interface";
import { FilteredCategory } from "src/app/core/models/filtered-category";

@Component({
  selector: "app-offer-manager",
  templateUrl: "./offer-manager.component.html",
  styleUrls: ["./offer-manager.component.scss"],
})
export class OfferManagerComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  categoriesData: OfferCategory[] = [];
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


  private async addOfferWithItsForm() {
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
