import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { OfferManagerComponent } from "../offer-manager/offer-manager.component";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";


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

  constructor(private route: ActivatedRoute,private router: Router) {}


  ngOnInit(): void {
    this.offerId = this.route.snapshot.paramMap.get("offerId") || null;
    this.formId = this.route.snapshot.paramMap.get("formId") || null;
    console.log(this.offerId)
    console.log(this.formId)
    if (this.offerId === null) {
      Swal.fire({
        icon: "error",
        title: "You Need To Choose An Offer To Edit 😮😏",
        confirmButtonColor: "#d33",
        confirmButtonText: "Go Back To Offers",
        allowOutsideClick: false, 
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(["/insurance/offers"]); 
        }
      });
    }

    this.whoesToEdit = {
      offer: this.offerId !== null ? true : false,
      form: this.formId !== null ? true : false,
    };
  }

  ngAfterViewInit(): void {
    this.offerManagerComponent.breadCrumbItems = [
      { label: "offer" },
      { label: "Edit offer", active: true },
    ];
  }
}
