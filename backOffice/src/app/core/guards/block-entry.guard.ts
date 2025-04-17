import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlockEntryGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userEmail = this.authService.getCurrentUserEmail();
    const roles = this.authService.getUserRoles();
    if (!userEmail) {
      this.router.navigate(['/account/signin']);
      return false;
    }
    else if (roles.includes('client')) {
      this.authService.redirectToClient();
      return false;
    }
    return true;
  }


}
