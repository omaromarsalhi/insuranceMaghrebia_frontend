import { Component, OnInit } from '@angular/core';
import { fullName, User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user?: User;
  fullName?: string;
  constructor(private authService : AuthService,private userService : UserService){}
  ngOnInit(): void {
    this.userService.getProfile(this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.user = data;
        this.fullName = fullName(this.user!);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
