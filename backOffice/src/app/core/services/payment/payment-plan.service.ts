import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subject, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaymentPlan } from '../../models/payment/payment-plan';


@Injectable({
  providedIn: 'root'
})
export class PaymentPlanService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,) { }


  getPaymentContractsByUserId(userId: string): Observable<PaymentPlan[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<PaymentPlan[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('No payment contracts found for the user:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }


}
