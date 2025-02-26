import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { OfferCategoryControllerService } from "src/app/core/services";
import { OfferCategory } from "src/app/core/models";
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
  categoriesData: OfferCategory[] = [];
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
    // this.formData.reset();
    // this.submitted = false;
    // const modalRef = this.modalService.open(content, {
    //   backdrop: "static",
    //   size: "md",
    // });
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

    modalRef.componentInstance.save.subscribe(() => {
      if (category) {
        // this.updateCategory();
        console.log('save')
      } else {
        // this.saveCategory();
        console.log('update')
      }
    });
  }

  // openUpdateModal(content: any, category: OfferCategory) {
  //   this.formData.patchValue(category);
  //   this.submitted = false;
  //   this.modalService.open(content, { backdrop: "static", size: "md" });
  // }
  openUpdateModal(category: OfferCategory) {
    // this.formData.patchValue(category);
    // this.submitted = false;
    // this.modalService.open(content, { backdrop: "static", size: "md" });
  }

  async saveCategory() {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }


    const params = {
      body: this.formData.value,
    };

    params.body.imageUri = this.imageUploader.getImageUri();
    console.log(params);

    this.categoryService.createOfferCategory(params).subscribe({
      next: (response) => {
        console.log(response);
        this.modalService.dismissAll();
        this.imageUploader.clearImage();
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
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteOfferCategory({ id: categoryId }).subscribe({
        next: () => {
          this._fetchData();
        },
        error: (error) => {
          console.error("Error deleting category:", error);
        },
      });
    }
  }

  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = true;
  // }

  // onDragLeave(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = false;
  // }

  // onFileDrop(event: DragEvent) {
  //   event.preventDefault();
  //   this.isDragging = false;
  //   const files = event.dataTransfer?.files;
  //   if (files && files.length > 0) {
  //     this.handleFile(files[0]);
  //   }
  // }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   this.selectedFile = file;
  //   if (file) this.handleFile(file);
  // }

  // handleFile(file: File) {
  //   this.fileName = file.name;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.uploadedImageUrl = reader.result as string;
  //   };
  //   reader.readAsDataURL(file);
  // }

  // clearImage() {
  //   this.uploadedImageUrl = null;
  //   this.fileName = "";
  //   this.selectedFile = null;
  // }

  getTargetBadgeClass(target: string): string {
    return target == "PARTICULAR"
      ? "bg-warning text-dark"
      : "bg-primary text-white";
  }

  handleImageError(category: any): void {
    category.imageUri = "assets/images/default-category.png";
  }
}
