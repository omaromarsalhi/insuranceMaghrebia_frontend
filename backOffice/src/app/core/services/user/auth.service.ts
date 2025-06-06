import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../../models/user/registration-request';
import { AuthenticationRequest } from '../../models/user/authentication-request';
import { AuthenticationResponse } from '../../models/user/authentication-response';
import { RefreshTokenRequest } from '../../models/user/refresh-token-request';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = "http://localhost:8888/api/v1/auth";
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }


  register(registrationRequest: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registrationRequest);
  }

  activateAccount(token: string): any {
    return this.http.get(`${this.apiUrl}/activate-account?token=` + token);
  }
  // Store JWT in Cookies

  getAccessToken(): string | null {
    return this.cookieService.get('access_token') || null;
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refresh_token') || null;
  }

  decodeToken(token: string): any {
    if (token)
      return jwtDecode(token) || null;
    else
      return null
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, authenticationRequest,{
      withCredentials: true,
    } );
  }
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    const decodedToken = this.decodeToken(refreshToken);
    const refreshTokenRequest: RefreshTokenRequest = {
      refreshToken: refreshToken,
      email: decodedToken.sub
    };

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, refreshTokenRequest,{
      withCredentials: true,
    });
  }

  getCurrentUserEmail(): string | null {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).sub || null;
  }

  getUserRoles(): string[] {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).authorities || null;
  }

  getCurrentUserFirstname(): string | null {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).firstname || null;
  }

  getCurrentUserId(): string | null {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).id || null;
  }

  logout() {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    this.router.navigate(['/account/signin']);
  }

  redirectFromLogin() {
    if (this.getUserRoles().includes("client"))
      this.redirectToClient(); // Redirect to frontoffice
    else
      this.redirectToAdmin(); // Redirect to backoffice
  }
  redirectToClient() {
    window.location.href = 'http://localhost:4200';
  }
  redirectToAdmin() {
    window.location.href = 'http://localhost:4300/user/list';
  }
}