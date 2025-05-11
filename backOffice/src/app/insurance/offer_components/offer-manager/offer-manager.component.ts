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
  OfferFormUpdateRequest,
  OfferRequest,
  OfferResponse,
  OfferUpdateRequest,
} from "src/app/core/models";
import { BehaviorSubject, of, Subject } from "rxjs";
import { OfferFormControllerService } from "../../../core/services/offer/offer-form-controller.service";
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
  offer2Update: OfferUpdateRequest;
  form2Update: OfferFormUpdateRequest;
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
        }
      } else if (!this.isThisEditMode.offer) {
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

      if (!this.isThisEditMode.offer) result = this.addOfferWithItsForm();
      else if (this.isThisEditMode.offer && this.isThisEditMode.form) 
        result = this.updateOfferWithItsForm();
       else if (this.isThisEditMode.offer && !this.isThisEditMode.form) 
        result = this.updateOffer();
      

      if (result) throw new Error("Offer submission failed");

      Swal.fire({
        icon: "success",
        title: this.isThisEditMode.offer
          ? "Offer updated successfully! 😘"
          : "Offer added successfully! 😘",
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

    this.createForm()
      .then((response) => {
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

  private updateOfferWithItsForm(): boolean {
    let res1 = this.updateForm();
    let res2 = this.updateOffer();
    return res1 && res2;
  }

  private updateOffer(): boolean {
    let error = false;
    let parm = {
      body: this.offer2Update,
    };
    console.log(this.offer2Update)
    this.offer2Update.createdAt=(new Date()).toISOString()
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

  createForm(): Promise<string> {
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

  updateForm(): boolean {
    let error = false;
    const formParms = {
      body: this.form2Update,
    };

    this.formService.update1(formParms).subscribe({
      next: (response) => {
        this.createdForm = response;
      },
      error: (error) => {
        error = true;
        this.popup(error,false)
        // console.error("Error saving offer form:", error);
      },
    });
    return error;
  }

  recieveOfferAction(holder: { action: string; data: OfferUpdateRequest }) {
    if (holder.action === "create" || holder.action === "update") {
      if (holder.action === "create") this.offer = holder.data as OfferRequest;
      else {
        console.log('holder',holder.data)
        this.offer2Update = holder.data;
        this.offer2Update.offerId = this.offerId;
      }

      
      let olValue = this.waiting2submitSubject.value;
      olValue.offerData = true;
      this.waiting2submitSubject.next(olValue);
    } else if (holder.action === "temp_save") this.offer2Update = holder.data;
  }

  recieveOfferFormAction(holder: {
    action: string;
    data: OfferFormUpdateRequest;
  }) {
    if (holder.action === "create") this.offerForm = holder.data.fields;
    else this.form2Update = holder.data;

    let olValue = this.waiting2submitSubject.value;
    olValue.offerFormData = true;
    this.waiting2submitSubject.next(olValue);
  }

  private _fetchCategoryData() {
    this.categoryService.getAll1().subscribe({
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
    if (this.isThisEditMode.offer && this.isThisEditMode.form)
      this.form2Update.fields = data;
    this.offerForm = data;
  }
}
