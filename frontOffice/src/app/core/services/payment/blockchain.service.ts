import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Blockchain } from '../../models/blockchain/blockchain';
import { PaymentBlockRequestDto } from '../../models/blockchain/PaymentBlockRequestDto';
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  private apiUrl = 'http://localhost:9015/api/v1/blockchain';

  constructor(private http: HttpClient) { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getBlock(index: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${index}`);
  }

  public create(block: PaymentBlockRequestDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, block);
  }

}
