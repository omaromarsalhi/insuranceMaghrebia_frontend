import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.checkAuthenticationStatus();
  }
  private checkAuthenticationStatus(): void {
    const userEmail = this.authService.getCurrentUserEmail();
    const roles = this.authService.getUserRoles();
    if (!userEmail) {
      this.router.navigate(['/account/signin']);
    }
    if (userEmail) {
      if (roles.includes('client')) {
        this.authService.redirectToClient();
      }
    }
  }
}
