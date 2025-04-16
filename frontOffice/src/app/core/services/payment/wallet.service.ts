import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blockchain } from '../../models/blockchain/blockchain';
import { PaymentBlockRequestDto } from '../../models/blockchain/PaymentBlockRequestDto';
import { WalletRequest } from '../../models/wallet/WalletRequest';
@Injectable({
    providedIn: 'root'
})
export class WalletService {

    private apiUrl = 'http://localhost:9022/api/v1/Wallet';

    constructor(private http: HttpClient) { }

    getApiUrl(): string {
        return this.apiUrl;
    }

    getOne(userId: String, includeTransactions: boolean = true): Observable<any> {
        return this.http.get(`${this.apiUrl}/${userId}?includeTransactions=${includeTransactions}`);
    }

    public create(wallet: WalletRequest): Observable<any> {
        return this.http.post<any>(this.apiUrl, wallet);
    }

    public update(wallet: WalletRequest, id: String, premium: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`
        const options = {
            params: { premium: premium }
        };
        return this.http.patch<any>(url, wallet, options);
    }

}
