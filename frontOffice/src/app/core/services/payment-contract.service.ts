import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaymentContractResponse } from '../models/payment/PaymentContractResponse';
import { PaymentMethod } from '../models/payment/paymentMethod';
@Injectable({
  providedIn: 'root'
})
export class PaymentContractService {

  private apiUrl = 'http://localhost:9001/api/v1/payment-contracts';
  constructor(private http: HttpClient) { }

  getApiUrl(): string { return this.apiUrl; }
  // makePayment(paymentData: any): Observable<any> {
  //   const apiUrl = this.apiUrl;
  //   return this.http.post<any>(`${apiUrl}`, paymentData);
  // }

  makePayment(paymentData: any): Observable<PaymentContractResponse> {
    return this.http.post<PaymentContractResponse>(`${this.apiUrl}`, paymentData).pipe(
      catchError((error) => {
        console.error('Payment error:', error);
        throw error;  // Or handle the error as needed
      })
    );
  }

  post(paymentData: any, paymentMethod: PaymentMethod): Observable<PaymentContractResponse> {
    return this.http.post<PaymentContractResponse>(`${this.apiUrl}?paymentMethod=${paymentMethod}`, paymentData).pipe(
      catchError((error) => {
        console.error('Payment error:', error);
        throw error;
      })
    );
  }

  getPaymentContracts(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  updatePaymentPlans(id: string, hashBlock: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${id}`, { hashBlock }).pipe(
      catchError((error) => {
        if (error.status === 400 || error.status === 500) {
          throw new Error(error.error.message);
        } else {
          throw new Error('An unexpected error occurred. Please try again later.');
        }
      })
    );
  }
}
