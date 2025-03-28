import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import {
  AnswersTypeDto,
  OfferDeletionRequest,
  OfferGeneralResponse,
  OfferResponse,
  OfferStateRequest,
} from "src/app/core/models";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import Swal from "sweetalert2";
import { OfferControllerService } from "src/app/core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.component.html",
  styleUrls: ["./offer-detail.component.scss"],
  animations: [
    trigger("accordionAnimation", [
      state(
        "collapsed",
        style({
          height: "0",
          opacity: "0",
          visibility: "hidden",
        })
      ),
      state(
        "expanded",
        style({
          height: "*",
          opacity: "1",
          visibility: "visible",
        })
      ),
      transition("collapsed <=> expanded", [
        animate("300ms cubic-bezier(0.4, 0, 0.2, 1)"),
      ]),
    ]),
  ],
})
export class OfferDetailComponent implements OnInit {
  @Input() offer: OfferResponse;
  @Output() deletedOfferId = new EventEmitter<string>();
  offerDeletionSelected: boolean = false;
  formDeletionSelected: boolean = false;
  purchasedDeletionSelected: boolean = false;
  selectedOption: string = "offerOnly";
  activeAccordionIndex: number | null = null;

  constructor(
    private offerService: OfferControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getAnswersForQuestion(
    answers: AnswersTypeDto[],
    questionIndex: number
  ): AnswersTypeDto[] {
    return answers.filter((a) => a.questionIndex === questionIndex);
  }

  navigateToEditOffer() {
    if (this.selectedOption === "offerOnly")
      this.router.navigate(["/insurance/edit-offer", this.offer.offerId]);
    else
      this.router.navigate([
        "/insurance/edit-offer",
        this.offer.offerId,
        this.offer.formId,
      ]);
  }

  onRadioChange(event: any) {
    this.selectedOption = event.target.value;
  }

  toggleAccordion(index: number) {
    this.activeAccordionIndex =
      this.activeAccordionIndex === index ? null : index;
  }

  isAccordionOpen(index: number): boolean {
    return this.activeAccordionIndex === index;
  }

  updateStatus() {
    const params: OfferStateRequest = {
      offerId: this.offer.offerId,
      state: !this.offer.isActive,
    };
    this.offerService.updateStatus({ body: params }).subscribe({
      next: (response: OfferGeneralResponse) => {
        if (response.status == "Updated successfully") {
          this.offer.isActive = !this.offer.isActive;
          this.popup(
            this.offer.isActive
              ? "This Offer Is Active"
              : "This Offer Is no longer Active",
            true
          );
        } else {
          this.popup(response.status, false);
          return;
        }
      },
      error: (error) => {
        console.log("Error Updating Status offer:", error);
        this.popup("Error Updating Status offer:" + error, false);
      },
    });
  }

  deleteOffer() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ms-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          const params: OfferDeletionRequest = {
            offerId: this.offer.offerId,
            formId: this.offer.formId,
            isOffer: this.offerDeletionSelected,
            isForm: this.formDeletionSelected,
            isPurchasedOffers: this.purchasedDeletionSelected,
          };
          this.offerService.delete({ body: params }).subscribe({
            next: (response: OfferGeneralResponse) => {
              if (response.status == "Deleted successfully")
                this.deletedOfferId.emit(response.offerId);
              else {
                this.popup(response.status, false);
                return;
              }
            },
            error: (error) => {
              this.popup("Error deleting offer:" + error, false);
            },
          });

          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Category has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Category is safe :)",
            "error"
          );
        }
      });
  }

  private popup(msg: string, status: boolean) {
    Swal.fire({
      icon: status ? "success" : "error",
      title: msg,
      confirmButtonColor: "#556ee6",
    });
  }
}
