import { Component , OnInit} from '@angular/core';
import { AuthService } from '../core/services/user/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLogged = false;
  constructor(private authService : AuthService){}
  ngOnInit(): void {
    if(this.authService.getCurrentUserEmail())
      this.userLogged = true;
    
  }

  navigateToLogin(){
    this.authService.redirectToLogin();
  }
  navigateToRegister(){
    this.authService.redirectToRegister();
  }
  logout(){
    this.authService.logout();
  }

}