import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import {
  ImageUploadControllerService,
  OfferCategoryControllerService,
} from "src/app/core/services";
import { OfferCategory } from "src/app/core/models";
import { UploadImage$Params } from "src/app/core/fn/image-upload-controller/upload-image";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
/**
 * Ecommerce category component
 */
export class CategoryComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  categoriesData: OfferCategory[] = [];
  uploadedImageUrl: string | ArrayBuffer = "";
  selectedFile: File = null;
  fileName: string = "";
  isDragging = false;
  term: any;
  isLoading: boolean = false;
  error: boolean = false;
  selectedCategory: any = null;
  deleteCategoryId: string | null = null;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private categoryService: OfferCategoryControllerService,
    private imageUploadService: ImageUploadControllerService
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

  openModal(content: any) {
    this.formData.reset();
    this.submitted = false;
    this.modalService.open(content, { backdrop: "static", size: "lg" });
  }


  openUpdateModal(content: any, category: OfferCategory) {
    this.formData.patchValue(category);
    this.submitted = false;
    this.modalService.open(content, { backdrop: "static", size: "lg" });
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        reject("No file selected");
        return;
      }

      const params: UploadImage$Params = {
        body: {
          file: this.selectedFile,
        },
      };

      this.imageUploadService.uploadImage(params).subscribe(
        (response: string) => {
          this.uploadedImageUrl = response;
          console.log("Image uploaded successfully:", response);
          resolve(response); // Resolve the promise with the uploaded URL
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }

  async saveCategory() {
    this.submitted = true;

    if (this.formData.invalid) {
      return;
    }

    await this.uploadImage();

    const params = {
      body: this.formData.value,
    };

    console.log(this.uploadedImageUrl);
    params.body.imageUri = this.uploadedImageUrl;

    this.categoryService.createOfferCategory(params).subscribe({
      next: (response) => {
        console.log(response)
        this.modalService.dismissAll();
        this.clearImage();
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

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
    if (file) this.handleFile(file);
  }

  handleFile(file: File) {
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  clearImage() {
    this.uploadedImageUrl = null;
    this.fileName = "";
    this.selectedFile = null;
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
