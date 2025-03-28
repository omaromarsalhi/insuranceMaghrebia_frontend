import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
import {
  OfferCategoryControllerService,
  OfferControllerService,
} from "src/app/core/services";
import {
  FormFieldDto,
  OfferCategory,
  OfferFormRequest,
  OfferFormResponse,
  OfferRequest,
  OfferResponse,
} from "src/app/core/models";
import { BehaviorSubject, of, Subject } from "rxjs";
import { OfferFormControllerService } from "../../../core/services/offer-form-controller.service";
import Swal from "sweetalert2";
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";

@Component({
  selector: "app-offer-manager",
  templateUrl: "./offer-manager.component.html",
  styleUrls: ["./offer-manager.component.scss"],
  animations: [
    trigger("scaleFade", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "scale(0.95)" })
        ),
      ]),
    ]),
    trigger("slideVertical", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate(
          "300ms 150ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "translateY(-20px)" })
        ),
      ]),
    ]),
    trigger("slideHorizontal", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateX(30px)" }),
        animate(
          "300ms ease-out",
          style({ opacity: 1, transform: "translateX(0)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in",
          style({ opacity: 0, transform: "translateX(30px)" })
        ),
      ]),
    ]),
  ],
})
export class OfferManagerComponent implements OnInit {
  @Input() isThisEditMode: { offer: boolean; form: boolean } = {
    offer: false,
    form: false,
  };
  @Input() offerId: string;
  triggerCleanEvent = new Subject<void>();
  breadCrumbItems: Array<{}>;
  categoriesData: OfferCategory[] = [];
  offer: OfferRequest;
  offerForm: FormFieldDto[] = [];
  createdForm: OfferFormResponse;
  createdOffer: OfferResponse;
  offer2Update: OfferResponse;
  form2Update: OfferFormResponse;
  isChatOpen = false;

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
    private offerService: OfferControllerService,
    private formService: OfferFormControllerService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "offer" },
      { label: "create offer", active: true },
    ];
    if (this.isThisEditMode.offer) this._fetchOfferData();

    this._fetchCategoryData();

    this.waiting2submit$.subscribe((value) => {
      if (this.isThisEditMode.offer) {
        if (value.offerData) {
          this.submitOffer();
        } else if (value.offerData && value.offerFormData) {
          this.popup("You need to create a Form", false);
          this.waiting2submitSubject.next({
            offerData: false,
            offerFormData: false,
          });
        }
      } else {
        if (value.offerData && value.offerFormData) {
          this.submitOffer();
          this.cleanThevariables();
        } else if (value.offerData) {
          this.popup("You need to create a Form", false);
          this.waiting2submitSubject.next({
            offerData: false,
            offerFormData: false,
          });
        }
      }
      // if (value.offerFormData) {
      //   const formParms = {
      //     body: {
      //       fields: this.offerForm,
      //     } as OfferFormRequest,
      //   };
      //   this.formService.create1(formParms).subscribe({
      //     next: (response) => {
      //       this.createdForm = response;
      //       console.log(response);
      //     },
      //     error: (error: HttpErrorResponse) => {
      //       console.error("Full error object:", error);

      //       if (error.status === 400) {
      //         if (error.error && error.error.errors) {
      //           // Use a Set to track unique field numbers
      //           const uniqueFieldNumbers = new Set<string>();

      //           const errorMessages = Object.entries(error.error.errors)
      //             .map(([field]) => {

      //               const fieldNumberMatch = field.match(/fields\[(\d+)\]/);
      //               const fieldNumber = fieldNumberMatch ? fieldNumberMatch[1] : "unknown";
      //               uniqueFieldNumbers.add(fieldNumber);

      //               return null;
      //             })
      //             .filter(() => true);

      //           const formattedErrors = Array.from(uniqueFieldNumbers)
      //             .map((fieldNumber) => `➤ Field #${fieldNumber}: invalid input`)
      //             .join("\n\n"); // Add spacing between errors

      //           Swal.fire({
      //             title: "Invalid Input",
      //             html: `<div style="text-align: left; white-space: pre-wrap;">${formattedErrors}</div>`,
      //             icon: "error",
      //             confirmButtonText: "OK",
      //             customClass: {
      //               popup: "swal-wide", // Optional: Add custom CSS for wider dialog
      //             },
      //           });
      //         } else {
      //           Swal.fire("Error", "Invalid form configuration", "error");
      //         }
      //       } else {
      //         Swal.fire("Error", "An unexpected error occurred", "error");
      //       }
      //     },
      //   });
      // }
    });
  }

  cleanThevariables() {
    this.waiting2submitSubject.next({
      offerData: false,
      offerFormData: false,
    });

    // this.offer = null
    this.offerForm = null;
    this.createdForm = null;
    this.createdOffer = null;
    this.triggerCleanEvent.next();
  }

  submitOffer = async () => {
    Swal.fire({
      title: this.isThisEditMode.offer
        ? "Offer is being updated!"
        : "Offer is being added!",
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      let result;

      if (this.isThisEditMode.offer) result = this.updateOffer();
      else if (!this.isThisEditMode.offer) result = this.addOfferWithItsForm();

      if (result) throw new Error("Offer submission failed");

      Swal.fire({
        icon: "success",
        title: this.isThisEditMode.offer
          ? "Offer updated successfully!"
          : "Offer added successfully!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: this.isThisEditMode.offer
          ? "Failed to update offer"
          : "Failed to add offer",
        text: error.message,
        timer: 2000,
      });
    }
  };

  private addOfferWithItsForm(): boolean {
    let error = false;

    this.createOffer()
      .then((response) => {
        console.log("result:", response);
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      })
      .finally(() => {
        this.offer.formId = this.createdForm.formId;

        const parm = {
          body: this.offer,
        };

        this.offerService.create1(parm).subscribe({
          next: (response) => {
            this.createdOffer = response;
          },
          error: (error) => {
            error = true;
            console.error("Error saving offer:", error);
          },
        });
      });
    return error;
  }

  private updateOffer(): boolean {
    let error = false;
    console.log(this.offer)
    const parm = {
      body: this.offer,
    };
    this.offerService.update(parm).subscribe({
      next: (response) => {
        this.createdOffer = response;
      },
      error: (error) => {
        error = true;
        console.error("Error saving offer:", error);
      },
    });
    return error;
  }

  createOffer(): Promise<string> {
    return new Promise((resolve, reject) => {
      const formParms = {
        body: {
          fields: this.offerForm,
        } as OfferFormRequest,
      };

      this.formService.create2(formParms).subscribe({
        next: (response) => {
          this.createdForm = response;
          resolve("done saving form");
        },
        error: (error) => {
          console.error("Error saving offer form:", error);
          reject(error);
        },
      });
    });
  }

  recieveOfferAction(holder: { action: string; data: OfferRequest }) {
    if (holder.action === "create" || holder.action === "update") {
      this.offer = holder.data;
      let olValue = this.waiting2submitSubject.value;
      olValue.offerData = true;
      this.waiting2submitSubject.next(olValue);
    } else if (holder.action === "temp_save") this.offer2Update = holder.data;
  }

  recieveOfferFormData(data: FormFieldDto[]) {
    this.offerForm = data;
    let olValue = this.waiting2submitSubject.value;
    olValue.offerFormData = true;
    this.waiting2submitSubject.next(olValue);
  }

  private _fetchCategoryData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoriesData = data;
      },
    });
  }

  private _fetchOfferData() {
    this.offerService.getByOfferId({ offerId: this.offerId }).subscribe({
      next: (data) => {
        this.offer2Update = data;
        this._fetchFormData();
      },
    });
  }

  private _fetchFormData() {
    this.formService.get({ formId: this.offer2Update.formId }).subscribe({
      next: (data) => {
        this.form2Update = data;
      },
    });
  }

  private popup(msg: string, status: boolean) {
    Swal.fire({
      icon: status ? "success" : "error",
      title: msg,
      confirmButtonColor: "#556ee6",
    });
  }

  receiveData(data: FormFieldDto[]) {
    this.offerForm = data;
  }
}
