import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationRequest } from 'src/app/core/models/user/employee-registration-request';
import { Role } from 'src/app/core/models/user/role';
import { User } from 'src/app/core/models/user/user';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { RoleService } from 'src/app/core/services/user/role.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  selectValue: string[];
  selected: string[] = [];
  roles: Array<Role>;
  breadCrumbItems: Array<{}>;
  users: Array<User>;
  submitted=false;
  userForm: FormGroup;
  constructor(private userService: UserService, private authService: AuthService, private modalService: NgbModal,private formBuilder: FormBuilder,private roleService : RoleService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'User' }, { label: 'Users List', active: true }];
    this.userService.getAll(this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    );
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      roles : ['']
    });
    this.roleService.getAll().subscribe(
      (data) => {
        this.selectValue = data.map(role => role.name);
      }
    );
  }

  delete(id: string) {
    this.userService.deleteUser(id, this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  ban(id: string) {
    this.userService.banUser(id, this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    )
  }

  unban(id: string) {
    this.userService.unBanUser(id, this.authService.getCurrentUserId()).subscribe(
      (data) => {
        this.users = data;
      }
    )
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  get f() {
    return this.userForm.controls;
  }
  saveUser(){
    this.submitted = true;
    this.userForm.patchValue({ roles: this.selected });
    if (this.selected.length === 0) {
      this.userForm.controls.roles.setErrors({ required: true });
    } else {
      this.userForm.controls.roles.setErrors(null);
    }
    if(!this.userForm.invalid)
    {
      
    const employeRegRequest : EmployeeRegistrationRequest = {
      firstname: this.f.firstName.value,
      lastname: this.f.lastName.value,
      email: this.f.email.value,
      roles : this.selected.map(role => ({ name: role }))
    };
      this.userService.createUser(employeRegRequest,this.authService.getCurrentUserId()).subscribe(
        (data)=> {
          this.users=data;
          this.modalService.dismissAll();
        },
        (error) => {
          this.userForm.controls.email.setErrors({ notUnique: true });
        }
      );
    }
  }
}
