import { Component, OnInit, EventEmitter, Output,Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OfferFormRequest } from '../../../core/models/offer-form-request';
import { FormFieldDto } from "src/app/core/models";
import Swal from 'sweetalert2';
import { Subject } from "rxjs";



@Component({
  selector: "app-form-creator",
  templateUrl: "./form-creator.component.html",
  styleUrls: ["./form-creator.component.scss"],
})
export class FormCreatorComponent implements OnInit {
  @Output() offerFormCreationEvent = new EventEmitter<FormFieldDto[]>();
  @Input() triggerCleanEvent!: Subject<void>;
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
    "radio"
  ];
  submit = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.initForm();

    this.triggerCleanEvent.subscribe(()=>{
      this.resetForm()
    })
  }




  // Submit method
  send2OfferManager() {
    // this.submit = true;
    // if (this.dynamicForm.valid) {
      const formData: FormFieldDto[] = this.dynamicForm.value.fields;
      this.offerFormCreationEvent.emit(formData);
    // }
  }

  private initForm(): void {
    this.dynamicForm = this.fb.group({
      fields: this.fb.array([]),
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
    return (this.fields.at(index) as FormGroup).get(
      controlName
    ) as AbstractControl;
  }


  validRegex(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    try {
      new RegExp(control.value);
      return null;
    } catch (e) {
      return { invalidRegex: true };
    }
  }

  validateRange(group: FormGroup): ValidationErrors | null {
    const start = group.get("rangeStart")?.value;
    const end = group.get("rangeEnd")?.value;
    return start !== null && end !== null && start > end
      ? { invalidRange: true }
      : null;
  }

  validateSelectOptions(group: FormGroup): ValidationErrors | null {
    const type = group.get("type")?.value;
    const options = group.get("selectOptions") as FormArray;
    return type === "select" && options.length === 0
      ? { selectOptionsRequired: true }
      : null;
  }

  // Updated createField function
  createField(order: number): FormGroup {
    return this.fb.group(
      {
        label: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,100}$/),
          ],
        ],
        type: [
          "text",
          [
            Validators.required,
            Validators.pattern(
              /^(text|email||date|tel|url|select|checkbox|radio)$/
            ),
          ],
        ],
        order: [
          order,
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^[1-9]\d*$/),
          ],
        ],
        required: [false],
        placeholder: [
          "",
          [Validators.required, Validators.pattern(/^[\w\s\-.,'()]{1,100}$/)],
        ],
        regex: ["", [Validators.required, this.validRegex]],
        regexErrorMessage: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9\s\-.,!?'()]{0,200}$/),
          ],
        ],
        rangeStart: [0, [Validators.pattern(/^-?\d+$/)]],
        rangeEnd: [10, [Validators.pattern(/^-?\d+$/)]],
        selectOptions: this.fb.array([]),
      },
      {
        validators: [this.validateRange, this.validateSelectOptions],
      }
    );
  }

  // Select Options FormArray (add this to your component)
  createSelectOption(): FormGroup {
    return this.fb.group({
      value: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-]{1,50}$/)],
      ],
      label: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-]{1,50}$/)],
      ],
    });
  }

  getSelectOptions(field: FormGroup): FormArray {
    return field.get("selectOptions") as FormArray;
  }

  // Update type assertions for select options
  addSelectOption(field: FormGroup): void {
    this.getSelectOptions(field).push(this.fb.control(""));
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
    this.submit = false
    while (this.fields.length > 0) {
      this.fields.removeAt(0);
    }
    this.initForm();
  }

  submitPreview() {
    // Handle preview form submission if needed
    console.log("Preview submitted");
  }

  openModal(content: any) {
    this.modalService.open(content, { backdrop: "static", size: "md" });
  }
}
