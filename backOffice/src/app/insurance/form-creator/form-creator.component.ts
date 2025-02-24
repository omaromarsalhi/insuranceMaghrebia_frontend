import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OfferFormData } from "src/app/core/models/insurance/offer-form-data.interface";

// // Remove generic FormControl types
// interface FieldGroup {
//   label: FormControl;
//   type: FormControl;
//   required: FormControl;
//   order: FormControl;
//   placeholder: FormControl;
//   regex: FormControl;
//   regexErrorMessage: FormControl;
//   rangeStart: FormControl;
//   rangeEnd: FormControl;
//   selectOptions: FormArray;
// }

@Component({
  selector: "app-form-creator",
  templateUrl: "./form-creator.component.html",
  styleUrls: ["./form-creator.component.scss"],
})
export class FormCreatorComponent implements OnInit {
  @Output() offerFormCreationEvent = new EventEmitter<OfferFormData[]>();
  dynamicForm!: FormGroup;
  availableFieldTypes = [
    "text",
    "email",
    "date",
    "time",
    "checkbox",
    "color",
    "range",
    "select",
  ];
  submit = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([])
    });
    this.addField();
  }

  get fields(): FormArray {
    return this.dynamicForm.get("fields") as FormArray;
  }

  get f() {
    return this.dynamicForm.controls as { fields: FormArray };
  }

  // Type-safe field control accessor
  getFieldControl(index: number, controlName: string): AbstractControl {
    return (this.fields.at(index) as FormGroup).get(controlName) as AbstractControl;
  }

  createField(order: number): FormGroup {
    return this.fb.group({
      label: ["", Validators.required],
      type: ["text", Validators.required],
      order: [order, [Validators.required, Validators.min(1)]],
      required: [false],
      placeholder: ["",Validators.required],
      description: ["",Validators.required],
      regex: ["",Validators.required],
      regexErrorMessage: [""],
      rangeStart: [0],
      rangeEnd: [10],
      selectOptions: this.fb.array([])
    });
  }


  getSelectOptions(field: FormGroup): FormArray {
    return field.get("selectOptions") as FormArray;
  }

  // Update type assertions for select options
  addSelectOption(field: FormGroup): void {
    this.getSelectOptions(field).push(this.fb.control(""));
  }

  // Submit method
  send2OfferManager() {
    this.submit = true;
    if (this.dynamicForm.valid) {
      const formData: OfferFormData[] = this.dynamicForm.value.fields;
      this.offerFormCreationEvent.emit(formData);
    }
  }

  addField(): void {
    const order = this.fields.length + 1;
    this.fields.push(this.createField(order));
  }

  removeField(index: number): void {
    this.fields.removeAt(index);
    this.updateFieldOrders();
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(
      this.fields.controls,
      event.previousIndex,
      event.currentIndex
    );
    this.updateFieldOrders();
  }

  private updateFieldOrders(): void {
    this.fields.controls.forEach((control, index) => {
      control.get("order")?.setValue(index + 1, { emitEvent: false });
    });
  }

  updateOrder(field: FormGroup, newOrder: number): void {
    const currentOrder = field.get("order")?.value;
    const maxOrder = this.fields.length;

    if (newOrder < 1 || newOrder > maxOrder || newOrder === currentOrder)
      return;

    const otherField = this.fields.controls.find(
      (f) => f.get("order")?.value === newOrder
    );

    if (otherField) {
      otherField.get("order")?.setValue(currentOrder);
    }
    field.get("order")?.setValue(newOrder);

    // Force re-sort
    this.fields.controls = [...this.fields.controls];
  }

  get sortedFields(): FormGroup[] {
    return this.fields.controls
      .map((control) => control as FormGroup)
      .sort((a, b) => a.get("order")?.value - b.get("order")?.value);
  }



  removeSelectOption(field: FormGroup, index: number): void {
    this.getSelectOptions(field).removeAt(index);
  }

  resetForm(): void {
    while (this.fields.length > 0) {
      this.fields.removeAt(0);
    }
    this.initForm();
  }

  // submitForm(): void {
  //   console.log('Form submitted:', this.dynamicForm.value);
  // }

  // Add this to your component class
  submitPreview() {
    // Handle preview form submission if needed
    console.log("Preview submitted");
  }

  openModal(content: any) {
    this.modalService.open(content, { backdrop: "static", size: "md" });
  }
}