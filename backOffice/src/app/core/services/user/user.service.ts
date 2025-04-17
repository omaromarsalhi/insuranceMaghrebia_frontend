import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from '../../models/user/update-profile-request';
import { ChangePasswordRequest } from '../../models/user/change-password-request';
import { Role } from '../../models/user/role';
import { EmployeeRegistrationRequest } from '../../models/user/employee-registration-request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8888/api/v1/user";

  constructor(private http: HttpClient) { }

  createUser(employeRegRequest: EmployeeRegistrationRequest,creatorId : string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create?creatorId=${creatorId}`, employeRegRequest, {
      withCredentials: true,
    });
  }

  getProfile(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/` + id, {
      withCredentials: true,
    });
  }
  getCurrentUserCanContinue(id: string): Observable<boolean> {
    return this.http.get<{ canContinue: boolean }>(`${this.apiUrl}/canContinue/${id}`, {
      withCredentials: true,
    }).pipe(
      map(response => response.canContinue)
    );
  }
  
  getUserRoles(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles/${id}`, {
      withCredentials: true,
    });
  }

  updateUserProfile(id: string, user: UpdateProfileRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/edit-profile/${id}`, user, {
      withCredentials: true,
    });
  }

  updateUserRoles(id: string, roles: Array<Role>): Observable<any> {
    return this.http.post(`${this.apiUrl}/edit-user-roles/${id}`, roles, {
      withCredentials: true,
    });
  }

  changePassword(changePasswordRequest: ChangePasswordRequest, id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password/${id}`, changePasswordRequest, {
      withCredentials: true,
    });
  }

  getAll(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/all?id=` + id, {
      withCredentials: true,
    });
  }

  deleteUser(id: string, deleterId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}?deleterId=` + deleterId, {
      withCredentials: true,
    });
  }

  banUser(id: string, bannerId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ban/${id}?bannerId=` + bannerId, {
      withCredentials: true,
    });
  }

  unBanUser(id: string, unBannerId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/unban/${id}?unBannerId=` + unBannerId, {
      withCredentials: true,
    });
  }

}
