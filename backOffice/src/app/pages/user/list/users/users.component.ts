import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  users :  Array<User>;
  constructor(private userService : UserService,private authService : AuthService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'User' }, { label: 'Users List', active: true }];
    this.userService.getAll(this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    );
  }
  delete(id : string) {
    this.userService.deleteUser(id,this.authService.getCurrentUserId()).subscribe(
      (data)=> {
        this.users = data;
      }
    );
  }
  ban(id : string) {
    this.userService.banUser(id,this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    )
  }
  unban(id : string) {
    this.userService.unBanUser(id,this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    )
  }

}
