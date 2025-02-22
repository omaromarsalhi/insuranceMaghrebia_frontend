
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from "@angular/forms";


@Component({
  selector: "app-add-offer",
  templateUrl: "./add-offer.component.html",
  styleUrls: ["./add-offer.component.scss"],
})
export class AddOfferComponent implements OnInit {
  labelsForm: FormGroup;
  breadCrumbItems: Array<{}>;
  form: FormGroup;
  phoneData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.labelsForm = this.fb.group({
      offerName: ["", Validators.required],
      labels: this.fb.array([]),
    });

    (this.form = this.fb.group({
      formlist: this.fb.array([]),
    })),
      (this.phoneData = this.fb.group({
        phoneValue: this.fb.array([]),
      }));
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Forms" },
      { label: "Form Layouts", active: true },
    ];
  }

  get labelsArray(): FormArray {
    return this.labelsForm.get("labels") as FormArray;
  }

  label(): FormArray {
    return this.labelsForm.get("labels") as FormArray;
  }

  createLabel(): FormGroup {
    return this.fb.group({
      name: ["", Validators.required],
      questions: this.fb.array([]),
      answers: this.fb.array([]),
    });
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
      questionText: ["", Validators.required],
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
      value: ["", Validators.required],
      questionIndex: [0, Validators.required],
    });
    this.getAnswers(labelIndex).push(answer);
  }

  deleteAnswer(labelIndex: number, answerIndex: number): void {
    this.getAnswers(labelIndex).removeAt(answerIndex);
  }

  onSubmit(): void {
    if (this.labelsForm.valid) {
      const formValue = this.labelsForm.value;
      console.log(formValue);
    }
  }

  formData(): FormArray {
    return this.form.get("formlist") as FormArray;
  }

  phonedata(): FormArray {
    return this.phoneData.get("phoneValue") as FormArray;
  }

  phone(): FormGroup {
    return this.fb.group({
      phonenumber: "",
    });
  }

  field(): FormGroup {
    return this.fb.group({
      name: "",
      email: "",
      subject: "",
      file: "",
      msg: "",
    });
  }

  addPhone() {
    this.phonedata().push(this.phone());
  }

  removeField(i: number) {
    if (confirm("Are you sure you want to delete this element?")) {
      this.formData().removeAt(i);
    }
  }

  deletePhone(i: number) {
    this.phonedata().removeAt(i);
  }
}
