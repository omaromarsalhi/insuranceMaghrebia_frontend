import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  OnDestroy,
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
  OfferFormResponse,
  OfferRequest,
  OfferResponse,
  OfferUpdateRequest,
} from "src/app/core/models";
import { OfferCategoryControllerService } from "src/app/core/services";
import { ImageUploaderComponent } from "src/app/shared/ui/image-uploader/image-uploader.component";

@Component({
  selector: "app-offer-creator",
  templateUrl: "./offer-creator.component.html",
  styleUrls: ["./offer-creator.component.scss"],
})
export class OfferCreatorComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  @Output() offerActionEvent = new EventEmitter<{
    action: string;
    data: OfferUpdateRequest;
  }>();
  @Input() isThisEditMode: { offer: boolean; form: boolean };
  @Input() offer2Update: OfferResponse = null;
  @Input() triggerCleanEvent!: Subject<void>;

  labelsForm: FormGroup;
  breadCrumbItems: Array<{}>;
  form: FormGroup;
  submit = false;
  categoryData: OfferCategory[] = [];
  filtereCategoryData: OfferCategory[] = [];
  isOffer2UpdateLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: OfferCategoryControllerService
  ) {}

  ngOnInit(): void {
    if (!this.isOffer2UpdateLoaded) this.initForm();

    this.breadCrumbItems = [
      { label: "Forms" },
      { label: "OFFER", active: true },
    ];

    this.triggerCleanEvent.subscribe(() => {
      this.resetLabelForm();
    });

    this._fetchCategoryData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["offer2Update"] && this.offer2Update != null) {
      this.initForm4Update();
      this.isOffer2UpdateLoaded = true;
    }
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
    this.submit = true;
    if (this.labelsForm.valid) {
    let formValue = this.labelsForm.value;
    formValue.category = this.getFilteredCategory(formValue.categoryId);
    this.imageUploader
      .uploadImage()
      .then((imageUrl) => {
        if (imageUrl !== "No file selected")
          this.offer2Update.imageUri = imageUrl;
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
      })
      .finally(() => {
        if (this.isThisEditMode.offer) this.prepereData4Update(formValue);
        this.offerActionEvent.emit({
          action: this.isThisEditMode.offer ? "update" : "create",
          data: this.isThisEditMode.offer ? this.offer2Update : formValue,
        });
      });
    }
  }

  private prepereData4Update(formValue) {
    this.offer2Update.benefits = formValue.benefits;
    this.offer2Update.category = this.getFilteredCategory(formValue.categoryId);
    this.offer2Update.header = formValue.header;
    this.offer2Update.labels = formValue.labels;
    this.offer2Update.name = formValue.name;
    this.offer2Update.tags = formValue.tags;
    this.offer2Update.packages = formValue.packages;
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
      tags: this.fb.array([]),
      newTag: [
        "",
        [Validators.pattern(/^[a-zA-Z0-9\- ]+$/)],
      ],
    });
  }

  private initForm4Update(): void {
    this.labelsForm = this.fb.group({
      name: [
        this.offer2Update.name,
        [Validators.required, Validators.pattern(/^[a-zA-Z\s\-.,']{1,100}$/)],
      ],
      header: [
        this.offer2Update.header,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,200}$/),
        ],
      ],
      categoryId: null,
      imageUri: [""],
      benefits: this.fb.array([]),
      labels: this.fb.array([]),
      packages: this.fb.array([]),
      tags: this.fb.array([]),
      newTag: [
        "",
        [ Validators.pattern(/^[a-zA-Z0-9\- ]+$/)],
      ],
    });

    this.offer2Update.benefits.forEach((benfit) => {
      this.benefitsArray.push(
        this.fb.group({
          benefitText: [
            benfit.benefitText,
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(150),
              Validators.pattern(/^[a-zA-Z0-9 .,!?@%&*()\-\/]+$/),
            ],
          ],
        })
      );
    });

    this.offer2Update.labels.forEach((label, index) => {
      this.labelsArray.push(
        this.fb.group(
          {
            name: [
              label.name,
              [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]{1,50}$/)],
            ],
            questions: this.fb.array([], Validators.required),
            answers: this.fb.array([], Validators.required),
          },
          { validators: this.validateLabelQuestionsAnswers }
        )
      );
      label.questions.forEach((question) => {
        this.getQuestions(index).push(
          this.fb.group({
            questionText: [
              question.questionText,
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9\s\-?.,']{1,200}$/),
              ],
            ],
          })
        );
      });
      label.answers.forEach((answer) => {
        this.getAnswers(index).push(
          this.fb.group({
            questionIndex: [answer.questionIndex],
            answerText: [
              answer.answerText,
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9\s\-.,']{1,200}$/),
              ],
            ],
          })
        );
      });
    });

    this.offer2Update.packages.forEach((pkg, index) => {
      this.packagesArray.push(
        this.fb.group({
          title: [pkg.title, [Validators.required]],
          price: [pkg.price, [Validators.required, Validators.min(0)]],
          duration: [pkg.duration, [Validators.required]],
          customDuration: [pkg.customDuration, []], // Add this line
          features: this.fb.array(
            [this.fb.control("", Validators.required)],
            [Validators.minLength(1), Validators.maxLength(5)]
          ),
        })
      );
      this.getPackageFeatures(index).clear();
      pkg.features.forEach((feature, index2) => {
        this.getPackageFeatures(index).insert(
          index2,
          this.fb.control(feature, Validators.required)
        );
      });
    });

    this.offer2Update.tags.forEach((tag) => {
      this.tagsArray.push(this.fb.control(tag));
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
    this.categoryService.getAll1().subscribe({
      next: (data) => {
        this.categoryData = data;
        if (this.categoryData.length > 0) {
          if (this.isOffer2UpdateLoaded) {
            let id: string = this.offer2Update.category.categoryId;

            this.labelsForm.patchValue({
              categoryId: id,
            });
            this.filtereCategoryData = this.categoryData.filter(
              (cat) => cat.categoryId !== id
            );
          } else
            this.labelsForm.patchValue({
              categoryId: this.categoryData[0].categoryId,
            });
        }
      },
    });
  }

  get tagsArray() {
    return this.labelsForm.get("tags") as FormArray;
  }

  addTag() {
    if (this.labelsForm.get("newTag").valid) {
      const newTag = this.labelsForm.get("newTag").value.trim();
      if (newTag) {
        this.tagsArray.push(this.fb.control(newTag));
        this.labelsForm.get("newTag").reset();
      }
    }
  }

  removeTag(index: number) {
    this.tagsArray.removeAt(index);
  }

  ngOnDestroy() {
    this.prepereData4Update(this.labelsForm.value);

    this.offerActionEvent.emit({
      action: "temp_save",
      data: this.offer2Update,
    });
  }
}
