import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UIModule } from "../../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgePipe } from 'src/app/core/pipes/age.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    AgePipe,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgSelectModule
  ]
})
export class ListModule { }
