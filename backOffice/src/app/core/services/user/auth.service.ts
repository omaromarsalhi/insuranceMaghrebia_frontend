import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationRequest } from '../../models/authentication-request';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:9004/api/v1/auth";

  constructor(private http: HttpClient) { }

  register(registrationRequest: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registrationRequest);
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, authenticationRequest);
  }

  activateAccount(token: string): any {
    return this.http.get(`${this.apiUrl}/activate-account?token=` + token);
  }

}