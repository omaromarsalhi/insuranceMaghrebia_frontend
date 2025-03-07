import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgApexchartsModule} from 'ng-apexcharts';
import {NgbCollapseModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {WidgetModule} from '../../shared/widget/widget.module';
import {UIModule} from '../../shared/ui/ui.module';
import {ContactsRoutingModule} from './contacts-routing.module';
import {ListComplaitComponent} from './listComplaint/listComplait.component';

@NgModule({
    declarations: [ListComplaitComponent],
    imports: [
        CommonModule,
        ContactsRoutingModule,
        WidgetModule,
        UIModule,
        NgSelectModule,
        NgApexchartsModule,
        FormsModule, ReactiveFormsModule,
        NgbTooltipModule,
        NgbNavModule,
        NgbCollapseModule,
    ]
})
export class ContactsModule {
}
