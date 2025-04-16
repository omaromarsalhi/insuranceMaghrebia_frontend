import {NgModule} from "@angular/core";
import {MagnificPopupDirective} from "../directives/magnific-popup.directive";
import {NiceSelectDirective} from "../directives/nice-select.directive";
import {AnimationDirective} from "../directives/animation.directive";
import {BackToTopComponent} from "../shared/ui/back-to-top/back-to-top.component";
import {CounterComponent} from "../shared/ui/counter/counter.component";
import {CamplaintComponent} from "./camplaint/camplaint.component";
import {ShowComplaintComponent} from "./show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./response-complaint/response-complaint.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/ui/shared.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ComplaintsRoutingModule} from "./complaints-routing.module";
import {PopupComponent} from "./popup/popup.component";

@NgModule({
  declarations: [
    CamplaintComponent,
    MagnificPopupDirective,
    NiceSelectDirective,
    AnimationDirective,
    BackToTopComponent,
    CounterComponent,
    CamplaintComponent,
    ShowComplaintComponent,
    ResponseComplaintComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComplaintsRoutingModule
  ],
  exports: [
    CounterComponent,
    BackToTopComponent,

  ]
})
export class ComplaintsModule { }
