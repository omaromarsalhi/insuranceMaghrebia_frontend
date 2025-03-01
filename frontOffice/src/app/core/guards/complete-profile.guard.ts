import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const completeProfileGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentPath = state.url;
  const allowedPaths = ["/home"];

  if (authService.getCurrentUserEmail()==null) {
    if(!allowedPaths.includes(currentPath)){
    authService.redirectToLogin();
    return false;
    }
    else
    return true;
  }
  return userService.getCurrentUserCanContinue(authService.getCurrentUserId()).pipe(
    map(canContinue => {
      if (!canContinue) {
        return router.createUrlTree(['/account/edit-profile']);
      }
      return true;
    })
  );
};
