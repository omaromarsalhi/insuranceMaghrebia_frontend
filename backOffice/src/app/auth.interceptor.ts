import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { AuthService } from "./core/services/user/auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the latest access token from the AuthService's BehaviorSubject
    const accessToken = this.authService.getAccessToken();

    // If the access token exists, attach it to the request headers
    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }
    // Continue with the request and catch 401 errors to trigger token refresh
    return next.handle(request).pipe(
      catchError((error) => {
        // If a 401 Unauthorized error occurs, handle the token refresh
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // Clone the request and add the Authorization header with the Bearer token
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Prevent multiple refresh token requests by checking if it's already refreshing
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);  // Reset the refresh token subject

      // Call the refresh token service to refresh the access token
      return this.authService.refreshAccessToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          const newAccessToken = this.authService.getAccessToken();

          this.refreshTokenSubject.next(newAccessToken);
          return next.handle(this.addTokenToRequest(request, newAccessToken!));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/account/signin']);
          return throwError(error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }
}
