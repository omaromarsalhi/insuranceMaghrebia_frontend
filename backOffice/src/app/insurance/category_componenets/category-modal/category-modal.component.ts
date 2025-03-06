import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploaderComponent } from 'src/app/shared/ui/image-uploader/image-uploader.component';


@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html'
})
export class CategoryModalComponent {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  @Input() form!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Output() save = new EventEmitter<string>();

  submitted: boolean = false;

  constructor(public activeModal: NgbActiveModal) {}

  // Called when form is submitted
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // Upload image first (if needed)
      this.imageUploader.uploadImage().then((imageUri) => {
        console.log('image : '+imageUri)
        this.save.emit(imageUri);
        this.activeModal.close();
      });
    }
  }

  // Close the modal
  dismiss() {
    this.activeModal.dismiss();
  }
}