import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/core/models/user/role';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { RoleService } from 'src/app/core/services/user/role.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  errormsg = '';
  breadCrumbItems: Array<{}>;
  userId: string;
  editorId: string;
  selectValue: string[];
  selected: string[];
  roles: Array<Role>;
  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private roleService: RoleService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Edit User' }, { label: 'Users List', active: true }];
    this.userId = this.route.snapshot.queryParamMap.get("id");
    this.userForm = this.formBuilder.group({
      roles: ['']
    });
    this.userService.getUserRoles(this.userId).subscribe(
      (data) => {
        this.roleService.getAll().subscribe(
          (data) => {
            this.selectValue = data.map(role => role.name);
          }
        );
        this.selected = data.map(role => role.name);
      },
      (error) => {
        console.log(error);
        this.router.navigate(['/user/list']);
      }
    );
  }
  get f() {
    return this.userForm.controls;
  }
  save() {
    this.submitted = true;
    this.userForm.patchValue({ roles: this.selected });
    if (this.selected.length === 0) {
      this.userForm.controls.roles.setErrors({ required: true });
    } else {
      this.userForm.controls.roles.setErrors(null);
    }
    if (!this.userForm.invalid) {
      this.roles = this.selected.map(role => ({ name: role }));
      this.userService.updateUserRoles(this.userId,this.roles).subscribe(
        (data) => {
          this.router.navigate(['/user/list']);
        }
      );
    }
  }
}
