import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordResetRequest } from '../../models/password-reset-request';
import { EmailRequest } from '../../models/email-request';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = "http://localhost:9004/api/v1/password";

  constructor(private http: HttpClient) { }

  forgetPassword(emailRequest: EmailRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/forget-password`, emailRequest);
  }

  resetPassword(token: string, passwordResetRequest: PasswordResetRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}`, passwordResetRequest);
  }
  verifyToken(token:string):Observable<any>{
    return this.http.get(`${this.apiUrl}/verify-password-token?token=${token}`);
  }
}