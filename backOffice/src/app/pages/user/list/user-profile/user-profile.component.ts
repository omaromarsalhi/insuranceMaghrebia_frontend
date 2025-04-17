import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fullName, User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  constructor(private userService: UserService, private authService: AuthService,private route : ActivatedRoute) { }
  user: User;
  fullName: string;
  userId : string;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'User Profile' }, { label: 'Users List', active: true }];
    this.userId = this.route.snapshot.queryParamMap.get("id");
    this.userService.getProfile(this.userId).subscribe(
      (data)=> {
        this.user=data;
        this.fullName = fullName(this.user);
      }
    );
  }

}
