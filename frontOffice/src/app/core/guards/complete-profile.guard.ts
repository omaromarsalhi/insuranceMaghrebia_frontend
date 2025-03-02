import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';
import { map, switchMap, of } from 'rxjs';

export const completeProfileGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentPath = state.url;
  const allowedPaths = ['/home'];

  let canContinue: boolean | null = null;

  if (authService.getCurrentUserEmail() == null) {
    if (!allowedPaths.includes(currentPath)) {
      authService.redirectToLogin();
      return of(false); 
    } else {
      return of(true);
    }
  }

  if (canContinue !== null) {
    return of(checkCanContinue(canContinue)); 
  }

  return userService.getCurrentUserCanContinue(authService.getCurrentUserId()).pipe(
    switchMap((canContinueResponse) => {
      canContinue = canContinueResponse;
      return of(checkCanContinue(canContinue));
    })
  );

  function checkCanContinue(canContinue: boolean | null) {
    if (canContinue === false) {
      return router.createUrlTree(['/account/edit-profile']); 
    }
    return true;
  }
};
