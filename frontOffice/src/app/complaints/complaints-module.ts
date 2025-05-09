import {NgModule} from "@angular/core";
import {CamplaintComponent} from "./camplaint/camplaint.component";
import {ShowComplaintComponent} from "./show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./response-complaint/response-complaint.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComplaintsRoutingModule} from "./complaints-routing.module";
import {PopupComponent} from "./popup/popup.component";

@NgModule({
  declarations: [
    CamplaintComponent,
    ShowComplaintComponent,
    ResponseComplaintComponent,
    PopupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ComplaintsRoutingModule
  ],
  exports: [

  ]
})
export class ComplaintsModule { }
