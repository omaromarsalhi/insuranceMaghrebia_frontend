import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailRequest } from 'src/app/core/models/email-request';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PasswordService } from 'src/app/core/services/user/password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  submitted = false;
  error = '';
  // set the currenr year
  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder, private router: Router, private forgetPasswordService: PasswordService) { }

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() { return this.forgetForm.controls; }

  onSubmit() {
    if (this.forgetForm.invalid) {
      return;
    }
    const emailRequest: EmailRequest = {
      email: this.f.email.value
    };

    this.submitted = true;
    this.forgetPasswordService.forgetPassword(emailRequest).subscribe(
    (data) => {
      this.router.navigate(['/account/check-mail'], { queryParams: { verify: "reset password" } });
    },
    (error) => {
      console.log(error);
      this.error = error.error.businessErrorDescription;
    }
    );
  }
}
