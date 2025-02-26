import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UIModule } from "../../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgePipe } from 'src/app/core/pipes/age.pipe';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    AgePipe
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbAlertModule
  ]
})
export class ListModule { }
