import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateResponseDTO } from '../transfer/DTOs/CreateResponseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  rootPath: string = "http://localhost:8888/api/v1/response"
  
    constructor(private httpClient: HttpClient) { }

    save(dto: CreateResponseDTO): Observable<any>{   
      return this.httpClient.post(this.rootPath, dto);
    }
}
