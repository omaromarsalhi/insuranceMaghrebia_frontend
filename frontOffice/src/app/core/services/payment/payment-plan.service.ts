import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, Subject, of } from 'rxjs';
import { debounceTime, delay, switchMap, tap, catchError } from 'rxjs/operators';
import { PaymentPlan } from '../../models/payment/PaymentsPlan';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlanService {

  private apiUrl = 'http://localhost:9001/api/v1/payment-plan';

  constructor(private http: HttpClient) { }

  public getPaymentContractsByUserId(userId: string): Observable<PaymentPlan[]> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.get<PaymentPlan[]>(url).pipe(
      catchError(this.handleError)
    );
  }
  getPaymentPlans(id: string): Observable<PaymentPlan[]> {
    return this.http.get<PaymentPlan[]>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('No payment contracts found for the user:', error.message);
    } else {
      console.error('An error occurred:', error.message);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  public put(id: string, hashBlock: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, { hashBlock }).pipe(
      catchError((error) => {
        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (error.status === 400 || error.status === 500) {
          errorMessage = error.error?.message || errorMessage;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
