import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PaymentIntentDto } from '../../models/stripe/PaymentIntentDto';
const cabecera = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class PaymentIntentService {

    private apiUrl = 'http://localhost:9001/api/v1/payment-Intent';
    constructor(private http: HttpClient) { }

    getApiUrl(): string {
        return this.apiUrl;
    }

    public create(paymentIntentDto: PaymentIntentDto): Observable<any> {
        return this.http.post<any>(this.apiUrl + '/paymentIntent', paymentIntentDto, cabecera);
    }

    capturePayment(paymentIntentId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/capture-payment/${paymentIntentId}`, null).pipe(
            catchError((error) => {
                const errorMessage = error.error?.message || 'An unexpected error occurred.';
                return throwError(() => new Error(errorMessage));
            })
        );
    }

    cancelPayment(paymentIntentId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/cancel-payment/${paymentIntentId}`, null).pipe(
            catchError((error) => {
                const errorMessage = error.error?.message || 'An unexpected error occurred.';
                return throwError(() => new Error(errorMessage));
            })
        );
    }

}
