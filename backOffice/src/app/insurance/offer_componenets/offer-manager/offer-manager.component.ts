import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
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

@Component({
  selector: "app-offer-manager",
  templateUrl: "./offer-manager.component.html",
  styleUrls: ["./offer-manager.component.scss"],
})
export class OfferManagerComponent implements OnInit {
  triggerCleanEvent = new Subject<void>();
  breadCrumbItems: Array<{}>;
  categoriesData: OfferCategory[] = [];
  offer: OfferRequest;
  offerForm: FormFieldDto[] = [];
  createdForm: OfferFormResponse;
  createdOffer: OfferResponse;
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

    this._fetchCategoryData();

    this.waiting2submit$.subscribe((value) => {
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
      title: "Offer is being added!",
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = this.addOfferWithItsForm();

      if (result) throw new Error("Offer submission failed");

      Swal.fire({
        icon: "success",
        title: "Offer added successfully!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add offer",
        text: error.message,
        timer: 2000,
      });
    }
  };

  private addOfferWithItsForm(): boolean {
    console.log("saving ...");
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

        this.offerService.create(parm).subscribe({
          next: (response) => {
            this.createdOffer = response;
            console.log(response);
          },
          error: (error) => {
            error = true;
            console.error("Error saving offer:", error);
          },
        });
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

      this.formService.create1(formParms).subscribe({
        next: (response) => {
          this.createdForm = response;
          console.log(response);
          resolve("done saving form");
        },
        error: (error) => {
          console.error("Error saving offer form:", error);
          reject(error);
        },
      });
    });
  }

  recieveOfferData(data: OfferRequest) {
    this.offer = data;
    let olValue = this.waiting2submitSubject.value;
    olValue.offerData = true;
    this.waiting2submitSubject.next(olValue);
  }

  recieveOfferFormData(data: FormFieldDto[]) {
    this.offerForm = data;
    let olValue = this.waiting2submitSubject.value;
    olValue.offerFormData = true;
    this.waiting2submitSubject.next(olValue);
    console.log(this.offerForm);
  }

  private _fetchCategoryData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoriesData = data;
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
}
