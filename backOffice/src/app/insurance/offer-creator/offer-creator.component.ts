import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl, ValidationErrors
} from "@angular/forms";
import { OfferCategory } from "src/app/core/models";
import { OfferData } from "src/app/core/models/insurance/offer-data.interface";

@Component({
  selector: "app-offer-creator",
  templateUrl: "./offer-creator.component.html",
  styleUrls: ["./offer-creator.component.scss"],
})
export class OfferCreatorComponent implements OnInit, OnChanges {

  @Output() offerCreationEvent = new EventEmitter<OfferData>();
  @Input() categoryData: OfferCategory[] = [];

  labelsForm: FormGroup;
  breadCrumbItems: Array<{}>;
  form: FormGroup;
  submit = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.breadCrumbItems = [
      { label: "Forms" },
      { label: "OFFER", active: true },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes["categoryData"] &&
      changes["categoryData"].currentValue?.length > 0
    ) {
      this.labelsForm.get("category")?.setValue(this.categoryData[0]);
    }
  }

  send2OfferManager() {
    this.submit=true
    if (this.labelsForm.valid) {
      const formValue:OfferData = this.labelsForm.value;
      this.offerCreationEvent.emit(formValue);
    }
  }

  get f() { return this.labelsForm.controls; }


  // private initForm(): void {
  //   this.labelsForm = this.fb.group({
  //     offerName: ["", [Validators.required, Validators.pattern('[a-zA-Z]+')]],
  //     offerHeader: ["", Validators.required],
  //     category: ["", Validators.required],
  //     imageUri: ["", Validators.required],
  //     labels: this.fb.array([]),
  //   });
  // }

  // createLabel(): FormGroup {
  //   return this.fb.group({
  //     name: ["", Validators.required],
  //     questions: this.fb.array([]),
  //     answers: this.fb.array([]),
  //   });
  // }

  
  validateLabelQuestionsAnswers(group: FormGroup): ValidationErrors | null {
    const questions = group.get('questions') as FormArray;
    const answers = group.get('answers') as FormArray;
    
    if (questions.length !== answers.length) {
      return { questionAnswerMismatch: true };
    }
    return null;
  }
  
  // Updated initForm
  private initForm(): void {
    this.labelsForm = this.fb.group({
      offerName: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s\-.,']{1,100}$/)
      ]],
      offerHeader: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s\-.,'()]{1,200}$/)
      ]],
      category: [""],
      imageUri: ["", Validators.required ],
      labels: this.fb.array([], Validators.required)
    });
  }
  
  // Updated createLabel with validations
  createLabel(): FormGroup {
    return this.fb.group({
      name: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s\-]{1,50}$/)
      ]],
      questions: this.fb.array([], Validators.required),
      answers: this.fb.array([], Validators.required)
    }, { validators:this.validateLabelQuestionsAnswers });
  }

  get labelsArray(): FormArray {
    return this.labelsForm.get("labels") as FormArray;
  }qIndex
  
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
      questionText: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s\-?.,']{1,200}$/)
      ]]
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
      answerText: ["", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s\-.,']{1,200}$/)
      ]]
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
    while (this.labelsArray.length > 0) {
      this.labelsArray.removeAt(0);
    }
    this.initForm();
  }

}
