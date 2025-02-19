import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { ImageUploadControllerService, OfferCategoryControllerService } from "src/app/core/services";
import { OfferCategory } from "src/app/core/models";
import { parseMarker } from "@fullcalendar/core";
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
  // Bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  categoriesData: OfferCategory[] = [];
  uploadedImageUrl: string | ArrayBuffer = '';  
  selectedFile: File = null;

  term: any;

  currentPage: number;

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
    });

    this.currentPage = 1;

    this._fetchData();
  }

  /**
   * Fetch categories data
   */
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

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.formData.reset();
    this.submitted = false;
    this.modalService.open(content, { backdrop: "static", size: "lg" });
  }

  /**
   * Open modal
   * @param content modal content
   */
  openUpdateModal(content: any, category: OfferCategory) {
    this.formData.patchValue(category);
    this.submitted = false;
    this.modalService.open(content, { backdrop: 'static', size: 'lg' });
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // uploadImage(): void {
  //   if (this.selectedFile) {
  
  //     const params: UploadImage$Params = {
  //       body: {
  //         file: this.selectedFile,
  //       },
  //     };
  
  //     this.imageUploadService.uploadImage(params).subscribe(
  //       (response: string) => {
  //         this.uploadedImageUrl = response;
  //         console.log('Image uploaded successfully:', response);
  //         console.log('Image uploaded successfully:', this.uploadedImageUrl );
  //       },
  //       (error) => {
  //         console.error('Error uploading image:', error);
  //       }
  //     );
  //   }
  // }

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
          console.log('Image uploaded successfully:', response);
          resolve(response); // Resolve the promise with the uploaded URL
        },
        (error) => {
          console.error('Error uploading image:', error);
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

    await this.uploadImage()

    const params = {
      body: this.formData.value,
    };

    console.log(this.uploadedImageUrl)
    params.body.imageUri=this.uploadedImageUrl

    this.categoryService.createOfferCategory(params).subscribe({
      next: (response) => {
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

    this.categoryService.updateOfferCategory(params).subscribe({
      next: (response) => {
        console.log("Category successfully updated:");
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
}
