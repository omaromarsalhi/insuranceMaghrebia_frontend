import { Component, OnInit } from '@angular/core';
import { UploadImage$Params } from 'src/app/core/fn/image-upload-controller/upload-image';
import { ImageUploadControllerService } from 'src/app/core/services';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

    uploadedImageUrl: string | ArrayBuffer = "";
    selectedFile: File = null;
    fileName: string = "";
    isDragging = false;
    isLoading: boolean = false;
  
    constructor(
        private imageUploadService: ImageUploadControllerService
      ) {}
    
  ngOnInit(): void {
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
          resolve(response); 
        },
        (error) => {
          console.error("Error uploading image:", error);
          reject(error);
        }
      );
    });
  }

  getImageUri(){
    return this.uploadedImageUrl;
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
