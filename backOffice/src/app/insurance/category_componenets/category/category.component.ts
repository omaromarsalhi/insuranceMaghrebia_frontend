import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ImageUploaderComponent } from "src/app/shared/ui/image-uploader/image-uploader.component";
import { uploadImage } from "../../../core/fn/image-upload-controller/upload-image";
import { CategoryModalComponent } from "../category-modal/category-modal.component";
import { element } from "protractor";
import { CategoryResponse } from "src/app/core/models/category-response";
import { OfferCategoryControllerService } from "src/app/core/services/offer-category-controller.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  @ViewChild("imageUploader") imageUploader: ImageUploaderComponent;
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  categoriesData: CategoryResponse[] = [];
  term: any;
  isLoading: boolean = false;
  error: boolean = false;
  selectedCategory: any = null;
  deleteCategoryId: string | null = null;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: OfferCategoryControllerService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Insurance" },
      { label: "Categories", active: true },
    ];

    this.formData = this.formBuilder.group({
      offerCategoryId: [null],
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      categoryTarget: ["", [Validators.required]],
    });

    this._fetchData();
  }

  private _fetchData() {
    this.categoryService.getAll1().subscribe({
      next: (data) => {
        this.categoriesData = data;
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }

  get form() {
    return this.formData.controls;
  }

  openModal(category?: any) {
    console.log(category);
    this.formData.reset();
    this.submitted = false;
    const modalRef = this.modalService.open(CategoryModalComponent, {
      backdrop: "static",
      size: "md",
    });

    // Pass data to the modal
    modalRef.componentInstance.form = this.formData;
    modalRef.componentInstance.isEditMode = !!category;

    if (category) {
      this.formData.patchValue(category);
    }

    modalRef.componentInstance.save.subscribe((imageUri: string) => {
      this.submitCategory(imageUri, !!category, category);
    });
  }

  submitCategory = async (
    imageUri: string,
    isEditMode: boolean,
    category: any
  ) => {
    Swal.fire({
      title:
        "Category is being " + (isEditMode ? "updated!" : "added!") + " 😉",
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (isEditMode) {
        let index = this.categoriesData.indexOf(category);
        this.updateCategory(category.categoryId, imageUri, index);
      } else this.saveCategory(imageUri);
      Swal.fire({
        icon: "success",
        title:
          "Category " +
          (isEditMode ? "Updated" : "Added") +
          " successfully! 🤩",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to " + (isEditMode ? "update" : "add") + " Category 🧐",
        text: error.message,
        timer: 2000,
      });
    }
  };

  saveCategory(imageUri: string) {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    const params = {
      body: this.formData.value,
    };

    params.body.imageUri = imageUri;
    console.log(params);

    this.categoryService.createOfferCategory(params).subscribe({
      next: (response: CategoryResponse) => {
        this.modalService.dismissAll();
        this.categoriesData.push(response);
      },
      error: (error) => {
        console.error("Error saving category:", error);
      },
    });
  }

  updateCategory(categoryId: string, imageUri: string, index: number) {
    if (this.formData.invalid) {
      return;
    }

    const params = {
      body: this.formData.value,
    };
    params.body.imageUri = imageUri;
    params.body.categoryId = categoryId;

    this.categoryService.updateOfferCategory(params).subscribe({
      next: (response: CategoryResponse) => {
        this.categoriesData[index] = response;
        this.modalService.dismissAll();
      },
      error: (error) => {
        console.error("Error updating category:", error);
      },
    });
  }

  deleteCategory(categoryId: string) {
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
          this.categoryService
            .deleteOfferCategory({ id: categoryId })
            .subscribe({
              next: () => {
                this.categoriesData = this.categoriesData.filter(
                  (element) => element.categoryId != categoryId
                );
              },
              error: (error) => {
                console.error("Error deleting category:", error);
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

  getTargetBadgeClass(target: string): string {
    return target == "PARTICULAR"
      ? "bg-warning text-dark"
      : "bg-primary text-white";
  }

  handleImageError(category: any): void {
    category.imageUri = "assets/images/default-category.png";
  }
}
