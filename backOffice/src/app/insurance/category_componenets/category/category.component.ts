import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { OfferCategoryControllerService } from "src/app/core/services";
import { CategoryResponse, OfferCategory } from "src/app/core/models";
import { ImageUploaderComponent } from "src/app/shared/ui/image-uploader/image-uploader.component";
import { uploadImage } from "../../../core/fn/image-upload-controller/upload-image";
import { CategoryModalComponent } from "../category-modal/category-modal.component";

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
    this.categoryService.getAllOfferCategories().subscribe({
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
      if (category) {
        console.log("update");
        // this.updateCategory();
      } else {
        this.submitOffer(imageUri);
      }
    });
  }

  submitOffer = async (imageUri: string) => {
    Swal.fire({
      title: "Category is being added!",
      timer: 2000,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      this.saveCategory(imageUri);
      Swal.fire({
        icon: "success",
        title: "Category added successfully!",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add Category",
        text: error.message,
        timer: 2000,
      });
    }
  };

  openUpdateModal(category: OfferCategory) {}

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
      next: (response) => {
        console.log(response);
        this.modalService.dismissAll();
        this._fetchData();
      },
      error: (error) => {
        console.error("Error saving category:", error);
      },
    });
  }

  updateCategory(categoryId: string) {
    if (this.formData.invalid) {
      return;
    }

    const params = {
      id: categoryId,
      body: this.formData.value,
    };
    console.log(params);

    this.categoryService.updateOfferCategory(params).subscribe({
      next: (response) => {
        this._fetchData();
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

          this.categoryService.deleteOfferCategory({ id: categoryId }).subscribe({
            next: () => {
              this._fetchData();
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
