import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss']
})
export class ConfirmMailComponent implements OnInit {
  otpValue: string = ''; // Store OTP value

  constructor(private authenticationService: AuthService, private router: Router) { }
  error = '';
  config = {
    allowNumbersOnly: true,
    length: 7,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '45px',
      'height': '45px'
    }
  };
  successmsg = false;


  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg');
  }

  confirmOtp() {
    const otpInputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
    let token = '';

    otpInputs.forEach(input => {
      token += input.value;
    });
    this.authenticationService.activateAccount(token).subscribe({
      next: (data) => {
        this.successmsg=true;
        if (this.successmsg) {
          this.router.navigate(['/account/signin']);
      }

      },
      error: (err) => {
        this.error = err.error.businessErrorDescription;
      }
    });
  }


  year: number = new Date().getFullYear();
}
