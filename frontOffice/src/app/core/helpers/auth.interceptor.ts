import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(()=>error);
      })
    );
  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;

          const newAccessToken = this.authService.getAccessToken();
          this.refreshTokenSubject.next(newAccessToken);

          return next.handle(this.addTokenToRequest(request, newAccessToken!));
        }),
        catchError((error) => {
          this.isRefreshing = false;

          this.authService.logout();
          return throwError(()=> error);
        })
      );
    } else {
      // If a token refresh is already in progress, wait for it to complete
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          // Retry the original request with the new access token
          return next.handle(this.addTokenToRequest(request, token));
        })
      );
    }
  }
}