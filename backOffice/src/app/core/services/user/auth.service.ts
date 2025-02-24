import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthenticationRequest } from '../../models/authentication-request';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { catchError, map, tap } from 'rxjs/operators';
import { RefreshTokenRequest } from '../../models/refresh-token-request';
import { Router } from '@angular/router';
import { RefreshResponse } from '../../models/refresh-response';
interface DecodedToken {
  sub: string; // Email of the user
  authorities: string[]; // User roles (optional, if needed)
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = "http://localhost:9004/api/v1/auth";
  private accessTokenSubject = new BehaviorSubject<string | null>(null); // Access token stored in BehaviorSubject
  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }


  register(registrationRequest: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registrationRequest);
  }

  activateAccount(token: string): any {
    return this.http.get(`${this.apiUrl}/activate-account?token=` + token);
  }
  // Store JWT in Cookies

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
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
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, authenticationRequest, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        this.accessTokenSubject.next(response.accessToken);
        this.redirectFromLogin();
      })
    );
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

    return this.http.post<any>(`${this.apiUrl}/refresh-token`, refreshTokenRequest, {
      withCredentials: true
    }).pipe(
      tap((response) => {
        // Set the new access token in BehaviorSubject
        this.accessTokenSubject.next(response.accessToken);
        console.log('Access token refreshed successfully');
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getCurrentUserEmail(): string | null {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).sub || null;
  }
  getUserRoles(): string[] {
    if (this.getRefreshToken())
      return this.decodeToken(this.getRefreshToken()).authorities || null;
  }
  logout() {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('refresh_token', '/');
    this.accessTokenSubject.next(null);
    this.router.navigate(['/account/signin']);
  }
  redirectFromLogin() {
    if (this.getUserRoles().includes("client"))
      window.location.href = 'http://localhost:4200/user/profile'; // Redirect to frontoffice
    else
      window.location.href = 'http://localhost:4300/dashboard'; // Redirect to backoffice
  }
  redirectToClient() {
    window.location.href = 'http://localhost:4200/user/profile';
  }
}