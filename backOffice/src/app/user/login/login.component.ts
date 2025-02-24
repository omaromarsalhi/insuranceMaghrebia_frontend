import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/core/models/authentication-request';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  backError = '';

  year: number = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthService) { }

  ngOnInit(): void {
    if (this.authenticationService.getCurrentUserEmail()) {
      this.authenticationService.redirectFromLogin();
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    const authRequest: AuthenticationRequest = {
      email: this.f.email.value,
      password: this.f.password.value,
      rememberMe: this.f.rememberMe.value
    };
    this.authenticationService.login(authRequest).subscribe(
      (data) => {
      },
      (error) => {
        this.backError = error.error.businessErrorDescription;
      }
    );
  }

}
