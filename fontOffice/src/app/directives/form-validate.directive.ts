import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appFormValidator]'
})
export class FormValidatorDirective implements OnInit {
  form!: FormGroup;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize the form controls
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      insuranceType: new FormControl(''),
      balance: new FormControl('')
    });

    // Initialize the form with the form controls
    const formElement = this.el.nativeElement as HTMLFormElement;
    this.renderer.listen(formElement, 'submit', this.onSubmit.bind(this));
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event): void {
    event.preventDefault();

    // If the form is valid, proceed to submit the form via HTTP
    if (this.form.valid) {
      this.submitForm().subscribe(
        (response) => {
          // Append response to result area
          const resultElement = this.el.nativeElement.querySelector('.result');
          resultElement.innerHTML = response;

          // Clear form fields
          this.form.reset();
        },
        (error) => {
          console.error('Error occurred while submitting the form', error);
        }
      );
    } else {
      // Handle validation errors here if needed
      console.error('Form is invalid');
    }
  }

  // Submit the form via HTTP POST
  private submitForm(): Observable<any> {
    const formElement = this.el.nativeElement as HTMLFormElement;
    const formData = new FormData(formElement);
    return this.http.post(formElement.action, formData);
  }
}
