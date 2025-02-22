import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = "http://localhost:9004/api/v1/role";

  constructor(private http: HttpClient) { }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/add`, role);
  }
}