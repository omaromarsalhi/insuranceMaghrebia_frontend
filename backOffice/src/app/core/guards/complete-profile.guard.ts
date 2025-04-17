import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/user/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard {
  private canContinue: boolean | null = null;

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (this.canContinue !== null) {
      return this.checkCanContinue();
    }

    return this.userService.getCurrentUserCanContinue(this.authService.getCurrentUserId()).pipe(
      switchMap(canContinue => {
        this.canContinue = canContinue;
        return this.checkCanContinue();
      })
    );
  }

  private checkCanContinue(): Observable<boolean | UrlTree> {
    if (!this.canContinue) {
      return of(this.router.createUrlTree(['/account/profile']));
    }
    return of(true);
  }
}
