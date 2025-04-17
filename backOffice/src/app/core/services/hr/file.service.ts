import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:8888/api/v1/resource';
  constructor(private http: HttpClient) { }

  downloadFile(filePath : string):Observable<any>{
    return this.http.get(`${this.apiUrl}/downloadFile?filePath=${filePath}`);
  }
}
