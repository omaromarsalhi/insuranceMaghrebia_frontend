import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { OfferManagerComponent } from "../offer-manager/offer-manager.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.component.html",
  styleUrls: ["./edit-offer.component.scss"],
})
export class EditOfferComponent implements OnInit, AfterViewInit {
  @ViewChild(OfferManagerComponent)
  offerManagerComponent!: OfferManagerComponent;
  whoesToEdit: { offer: boolean; form: boolean } = {
    offer: false,
    form: false,
  };
  offerId: string = null;
  formId: string = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get("offerId") || "null";
    this.formId = this.route.snapshot.paramMap.get("formId") || "null";
    this.whoesToEdit = {
      offer: this.offerId !== "null" ? true : false,
      form: this.formId !== "null" ? true : false,
    };
  }

  ngAfterViewInit(): void {
    this.offerManagerComponent.breadCrumbItems = [
      { label: "offer" },
      { label: "Edit offer", active: true },
    ];
  }
}
