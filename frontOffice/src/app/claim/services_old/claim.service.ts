import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateClaimDTO } from '../transfer/DTOs/CreateClaimDTO';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  rootPath: string = "http://localhost:9010/api/v1/claim"

  constructor(private httpClient: HttpClient) { }

  addClaim(claimDTO: CreateClaimDTO): Observable<any>{
    return this.httpClient.post(this.rootPath, claimDTO);
  }
}
