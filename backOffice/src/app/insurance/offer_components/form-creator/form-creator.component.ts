import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  TemplateRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { OfferFormRequest } from "../../../core/models/offer-form-request";
import {
  FormFieldDto,
  OfferFormResponse,
  OfferFormUpdateRequest,
} from "src/app/core/models";
import Swal from "sweetalert2";
import { Subject } from "rxjs";

@Component({
  selector: "app-form-creator",
  templateUrl: "./form-creator.component.html",
  styleUrls: ["./form-creator.component.scss"],
})
export class FormCreatorComponent implements OnInit {
  @Output() offerFormActionEvent = new EventEmitter<{
    action: string;
    data: OfferFormUpdateRequest;
  }>();
  @Input() triggerCleanEvent!: Subject<void>;
  @Input() formCreatedByAi: FormFieldDto[] = [];
  @Input() useFormCreatedByAi: boolean;
  @Input() form2Update: OfferFormResponse = null;
  @Input() isThisEditMode: { offer: boolean; form: boolean } = {
    offer: false,
    form: false,
  };
  isOnInitDone: boolean = false;
  isForm2UpdateLoaded: boolean = false;
  dynamicForm!: FormGroup;
  activeSection = 0;
  rangeValues: number[] = [];
  colorPreviews: string[] = [];
  availableFieldTypes = [
    "number",
    "textarea",
    "text",
    "email",
    "date",
    "time",
    "checkbox",
    "color",
    "range",
    "select",
    "radio",
  ];
  submit = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit(): void {
    if (!this.isThisEditMode.form) this.initForm();
    this.isOnInitDone = true;
    this.triggerCleanEvent.subscribe(() => {
      this.resetForm();
    });
    if (this.useFormCreatedByAi) this.setAiForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["formCreatedByAi"] &&
      this.isOnInitDone &&
      changes["formCreatedByAi"].currentValue.length > 0
    ) {
      this.setAiForm();
    }
    if (changes["form2Update"] && this.form2Update != null) {
      this.initForm();
      this.setUpdateForm();
      this.isForm2UpdateLoaded = true;
    }
  }

  setUpdateForm(): void {
    this.fields.clear();
    this.form2Update.fields.forEach((data, index) => {
      this.fields.push(this.createFieldBasedOnLocalData(data));
    });
  }

  setAiForm(): void {
    this.fields.clear();
    this.formCreatedByAi.forEach((data) => {
      this.fields.insert(data.order, this.createFieldBasedOnLocalData(data));
    });
  }

  // Submit method
  send2OfferManager() {
    this.submit = true;
    if (this.dynamicForm.value && this.f.fields.valid) {
      const formData: FormFieldDto[] = this.dynamicForm.value.fields;
      if (this.isThisEditMode.offer && this.isThisEditMode.form) {
        this.offerFormActionEvent.emit({
          action: "update",
          data: { formId: this.form2Update.formId, fields: formData },
        });
        this.popup("Form saved successfuly,To update The Form you Need To save the Offer Also 🙂", true);
      } else if(!this.isThisEditMode.offer) {
        this.offerFormActionEvent.emit({
          action: "create",
          data: { formId: null, fields: formData },
        });
        this.popup("Form added successfuly", true);
      }
    } else {;
      this.popup("Your form is not valid ", false);
    }
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
  // createField(order: number): FormGroup {
  //   return this.fb.group(
  //     {
  //       label: [
  //         "",
  //         [
  //           Validators.required,
  //           Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,100}$/),
  //         ],
  //       ],
  //       type: [
  //         "text",
  //         [
  //           Validators.required,
  //           Validators.pattern(
  //             /^(text|email||date|tel|url|select|checkbox|radio)$/
  //           ),
  //         ],
  //       ],
  //       order: [
  //         order,
  //         [
  //           Validators.required,
  //           Validators.min(1),
  //           Validators.pattern(/^[1-9]\d*$/),
  //         ],
  //       ],
  //       required: [false],
  //       placeholder: [
  //         "",
  //         [Validators.required, Validators.pattern(/^[\w\s\-.,'()]{1,100}$/)],
  //       ],
  //       regex: ["", [Validators.required, this.validRegex]],
  //       regexErrorMessage: [
  //         "",
  //         [
  //           Validators.required,
  //           Validators.pattern(/^[a-zA-Z0-9\s\-.,!?'()]{0,200}$/),
  //         ],
  //       ],
  //       rangeStart: [0, [Validators.pattern(/^-?\d+$/)]],
  //       rangeEnd: [10, [Validators.pattern(/^-?\d+$/)]],
  //       selectOptions: this.fb.array([]),
  //     },
  //     {
  //       validators: [this.validateRange, this.validateSelectOptions],
  //     }
  //   );
  // }

  createField(order: number): FormGroup {
    const formGroup = this.fb.group(
      {
        label: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,100}$/),
          ],
        ],
        type: ["text"],
        order: [order],
        required: [false],
        placeholder: [""],
        regex: [""], // Validators set dynamically
        regexErrorMessage: [""],
        rangeStart: [0, [Validators.pattern(/^-?\d+$/)]],
        rangeEnd: [10, [Validators.pattern(/^-?\d+$/)]],
        selectOptions: this.fb.array([]),
      },
      {
        validators: [this.validateRange, this.validateSelectOptions],
      }
    );

    const placeholder = formGroup.get("placeholder");
    const typeControl = formGroup.get("type");
    const regexControl = formGroup.get("regex");
    const regexErrorControl = formGroup.get("regexErrorMessage");
    const rangeStart = formGroup.get("rangeStart");
    const rangeEnd = formGroup.get("rangeEnd");
    const selectOptions = formGroup.get("selectOptions");

    // Define which types require regex validation
    const updateRegexValidators = (currentType: string) => {
      const requiresRegex = ["text", "email", "number", "textarea"].includes(
        currentType
      );
      const isOptionsType = ["select", "radio"].includes(currentType);

      const cleaner = () => {
        placeholder.setValidators(null);
        regexControl.setValidators(null);
        regexErrorControl.setValidators(null);
        rangeStart.setValidators(null);
        rangeEnd.setValidators(null);
        selectOptions.setValidators(null);
      };

      cleaner();

      if (requiresRegex) {
        regexControl.setValidators([Validators.required, this.validRegex]);
        regexErrorControl.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-.,!?'()]{0,200}$/),
        ]);
        placeholder.setValidators([
          Validators.required,
          Validators.pattern(/^[\w\s\-.,'()]{1,100}$/),
        ]);
      }

      if (isOptionsType) {
        selectOptions.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-]{1,50}$/),
        ]);
      }

      regexControl.updateValueAndValidity();
      regexErrorControl.updateValueAndValidity();
      placeholder.updateValueAndValidity();
      rangeStart.updateValueAndValidity();
      rangeEnd.updateValueAndValidity();
      selectOptions.updateValueAndValidity();
    };

    updateRegexValidators(typeControl.value);

    typeControl.valueChanges.subscribe(updateRegexValidators);

    return formGroup;
  }

  createFieldBasedOnLocalData(data: FormFieldDto): FormGroup {
    const formGroup = this.fb.group(
      {
        label: [
          data.label,
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,100}$/),
          ],
        ],
        type: [data.type],
        order: [data.order],
        required: [data.required],
        placeholder: [data.placeholder],
        regex: [data.regex],
        javaRegex: [data.javaRegex],
        regexErrorMessage: [data.regexErrorMessage],
        rangeStart: [data.rangeStart ?? 0, [Validators.pattern(/^-?\d+$/)]],
        rangeEnd: [data.rangeEnd ?? 10, [Validators.pattern(/^-?\d+$/)]],
        selectOptions: this.fb.array(data.selectOptions || []),
      },
      {
        validators: [this.validateRange, this.validateSelectOptions],
      }
    );

    const typeControl = formGroup.get("type");
    const regexControl = formGroup.get("regex");
    const regexErrorControl = formGroup.get("regexErrorMessage");
    const selectOptions = formGroup.get("selectOptions") as FormArray;

    const updateValidators = (currentType: string) => {
      const requiresRegex = ["text", "email", "number", "textarea"].includes(
        currentType
      );
      const isOptionsType = ["select", "radio"].includes(currentType);

      // Reset validators
      regexControl?.clearValidators();
      regexErrorControl?.clearValidators();
      selectOptions.clearValidators();

      if (requiresRegex) {
        regexControl?.setValidators([Validators.required, this.validRegex]);
        regexErrorControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-.,!?'()]{0,200}$/),
        ]);
      }

      if (isOptionsType) {
        selectOptions.setValidators([Validators.required]);
        selectOptions.clear();
        if (data.selectOptions) {
          data.selectOptions.forEach((option) =>
            selectOptions.push(new FormControl(option))
          );
        }
      }

      regexControl?.updateValueAndValidity();
      regexErrorControl?.updateValueAndValidity();
      selectOptions.updateValueAndValidity();
    };

    updateValidators(typeControl?.value);

    typeControl?.valueChanges.subscribe(updateValidators);

    return formGroup;
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
    this.submit = false;
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

  private popup(msg: string, status: boolean) {
    Swal.fire({
      icon: status ? "success" : "error",
      title: msg,
      confirmButtonColor: "#556ee6",
    });
  }

  getFieldTypeIcon(type: string): string {
    const icons = {
      text: "fa-align-left",
      email: "fa-envelope",
      date: "fa-calendar-day",
      range: "fa-slider",
      color: "fa-palette",
      radio: "fa-circle-dot",
      checkbox: "fa-square-check",
      select: "fa-list",
    };
    return icons[type] || "fa-question-circle";
  }

  setActiveSection(index: number): void {
    this.activeSection = index;
  }

  updateRangeValue(event: any, index: number): void {
    this.rangeValues[index] = event.target.value;
  }

  updateColorPreview(event: any, index: number): void {
    this.colorPreviews[index] = event.target.value;
  }
}
