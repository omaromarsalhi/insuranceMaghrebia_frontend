import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/user/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.userService.getCurrentUserCanContinue(this.authService.getCurrentUserId()).pipe(
      map(canContinue => {
        if (!canContinue) {
          return this.router.createUrlTree(['/account/profile']); 
        }
        return true;
      })
    );
  }
}
