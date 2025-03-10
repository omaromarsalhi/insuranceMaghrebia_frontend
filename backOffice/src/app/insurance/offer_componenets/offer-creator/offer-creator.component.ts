import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from "@angular/forms";
import { Subject } from "rxjs";
import {
  FilteredCategoryDto,
  OfferCategory,
  OfferRequest,
} from "src/app/core/models";
import { OfferCategoryControllerService } from "src/app/core/services";
import { ImageUploaderComponent } from "src/app/shared/ui/image-uploader/image-uploader.component";

@Component({
  selector: "app-offer-creator",
  templateUrl: "./offer-creator.component.html",
  styleUrls: ["./offer-creator.component.scss"],
})
export class OfferCreatorComponent implements OnInit {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  @Output() offerCreationEvent = new EventEmitter<OfferRequest>();
  @Input() triggerCleanEvent!: Subject<void>;

  labelsForm: FormGroup;
  breadCrumbItems: Array<{}>;
  form: FormGroup;
  submit = false;
  categoryData: OfferCategory[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: OfferCategoryControllerService
  ) {}

  ngOnInit(): void {
    this._fetchCategoryData();

    this.initForm();


    this.breadCrumbItems = [
      { label: "Forms" },
      { label: "OFFER", active: true },
    ];

    this.triggerCleanEvent.subscribe(() => {
      this.resetLabelForm();
    });
  }

  getFilteredCategory(categoryId: string): FilteredCategoryDto | undefined {
    let fielteredCategory = this.categoryData.find(
      (category) => category.categoryId === categoryId
    );
    return {
      categoryId: fielteredCategory.categoryId,
      name: fielteredCategory.name,
      categoryTarget: fielteredCategory.categoryTarget,
    } as FilteredCategoryDto;
  }

  send2OfferManager() {
    console.log(this.labelsForm.value);
    this.submit = true;
    // if (this.labelsForm.valid) {
      let formValue = this.labelsForm.value;
      formValue.category = this.getFilteredCategory(formValue.categoryId);

      this.imageUploader
        .uploadImage()
        .then((imageUrl) => {
          formValue.imageUri = imageUrl;
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        })
        .finally(() => {
          this.offerCreationEvent.emit(formValue);
        });
    // }
  }

  get f() {
    return this.labelsForm.controls;
  }

  validateLabelQuestionsAnswers(group: FormGroup): ValidationErrors | null {
    const questions = group.get("questions") as FormArray;
    const answers = group.get("answers") as FormArray;

    if (questions.length !== answers.length) {
      return { questionAnswerMismatch: true };
    }
    return null;
  }

  private initForm(): void {
    this.labelsForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.pattern(/^[a-zA-Z\s\-.,']{1,100}$/)],
      ],
      header: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,200}$/),
        ],
      ],
      categoryId: [""],
      imageUri: ["", Validators.required],
      benefits: this.fb.array([], [Validators.required]),
      labels: this.fb.array([], Validators.required),
      packages: this.fb.array([], Validators.required),
    });
  }

  get packagesArray() {
    return this.labelsForm.get("packages") as FormArray;
  }

  getPackageFeatures(packageIndex: number) {
    return this.packagesArray.at(packageIndex).get("features") as FormArray;
  }

  addPackage() {
    const packageGroup = this.fb.group({
      title: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0)]],
      duration: ["", [Validators.required]],
      customDuration: ["", []], // Add this line
      features: this.fb.array(
        [this.fb.control("", Validators.required)],
        [Validators.minLength(1), Validators.maxLength(5)]
      ),
    });

    // Add conditional validation
    packageGroup.get("duration").valueChanges.subscribe((value) => {
      if (value === "custom") {
        packageGroup.get("customDuration").setValidators([Validators.required]);
      } else {
        packageGroup.get("customDuration").clearValidators();
      }
      packageGroup.get("customDuration").updateValueAndValidity();
    });

    this.packagesArray.push(packageGroup);
  }

  deletePackage(index: number) {
    this.packagesArray.removeAt(index);
  }

  addFeature(packageIndex: number) {
    const features = this.getPackageFeatures(packageIndex);
    if (features.length < 5) {
      features.push(this.fb.control("", Validators.required));
    }
  }

  deleteFeature(packageIndex: number, featureIndex: number) {
    const features = this.getPackageFeatures(packageIndex);
    features.removeAt(featureIndex);
  }

  get benefitsArray() {
    return this.labelsForm.get("benefits") as FormArray;
  }

  createBenefit(): FormGroup {
    return this.fb.group({
      benefitText: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
          Validators.pattern(/^[a-zA-Z0-9 .,!?@%&*()-]+$/),
        ],
      ],
    });
  }

  canDeleteBenefit(index: number): boolean {
    return index >= 1; // Lock first 3 benefits
  }

  addBenefit() {
    this.benefitsArray.push(this.createBenefit());
  }

  deleteBenefit(index: number) {
    this.benefitsArray.removeAt(index);
  }

  createLabel(): FormGroup {
    return this.fb.group(
      {
        name: [
          "",
          [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]{1,50}$/)],
        ],
        questions: this.fb.array([], Validators.required),
        answers: this.fb.array([], Validators.required),
      },
      { validators: this.validateLabelQuestionsAnswers }
    );
  }

  get labelsArray(): FormArray {
    return this.labelsForm.get("labels") as FormArray;
  }

  addLabel(): void {
    this.labelsArray.push(this.createLabel());
  }

  deleteLabel(index: number): void {
    this.labelsArray.removeAt(index);
  }

  getQuestions(labelIndex: number): FormArray {
    return this.labelsArray.at(labelIndex).get("questions") as FormArray;
  }

  addQuestion(labelIndex: number): void {
    const question = this.fb.group({
      questionText: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-?.,']{1,200}$/),
        ],
      ],
    });
    this.getQuestions(labelIndex).push(question);
  }

  deleteQuestion(labelIndex: number, questionIndex: number): void {
    const questions = this.getQuestions(labelIndex);
    const answers = this.getAnswers(labelIndex);

    for (let i = answers.length - 1; i >= 0; i--) {
      if (answers.at(i).get("questionIndex").value === questionIndex) {
        answers.removeAt(i);
      }
    }

    questions.removeAt(questionIndex);
  }

  trackAnswer(index: number, answer: AbstractControl): number {
    return index;
  }

  getAnswers(labelIndex: number): FormArray {
    return this.labelsArray.at(labelIndex).get("answers") as FormArray;
  }

  addAnswer(labelIndex: number): void {
    const answer = this.fb.group({
      questionIndex: [0],
      answerText: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-.,']{1,200}$/),
        ],
      ],
    });
    this.getAnswers(labelIndex).push(answer);
  }

  deleteAnswer(labelIndex: number, answerIndex: number): void {
    this.getAnswers(labelIndex).removeAt(answerIndex);
  }

  onsubmit(): void {
    if (this.labelsForm.valid) {
      const formValue = this.labelsForm.value;
      console.log(this.labelsForm.value);
    }
  }

  formData(): FormArray {
    return this.form.get("formlist") as FormArray;
  }

  removeField(i: number) {
    if (confirm("Are you sure you want to delete this element?")) {
      this.formData().removeAt(i);
    }
  }

  resetLabelForm(): void {
    this.submit = false;
    while (this.labelsArray.length > 0) {
      this.labelsArray.removeAt(0);
    }
    this.initForm();
  }

  private _fetchCategoryData() {
    this.categoryService.getAllOfferCategories().subscribe({
      next: (data) => {
        this.categoryData = data;
        if (this.categoryData.length > 0) {
          this.labelsForm.patchValue({
            categoryId: this.categoryData[0].categoryId,
          });
        }
      },
    });
  }
}
