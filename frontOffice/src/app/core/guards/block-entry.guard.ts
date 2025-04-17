import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';

export const blockEntryGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userEmail = authService.getCurrentUserEmail();

  if (!userEmail) {
    authService.redirectToLogin();
    return false;
  }
  return true;
};
