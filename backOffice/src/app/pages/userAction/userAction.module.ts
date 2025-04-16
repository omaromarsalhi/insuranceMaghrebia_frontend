import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UIModule} from '../../shared/ui/ui.module';
import {NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbNavModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {UserActionRoutingModule} from './userAction-routing.module';
import {AdvancedSortableDirective} from './reports/advanced-sortable.directive';
import {AdvancedtableComponent} from './reports/advancedtable.component';
import {ReportDetailComponent} from './reportDetail/reportDetail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
    declarations: [AdvancedtableComponent, AdvancedSortableDirective, ReportDetailComponent],
    imports: [
        CommonModule,
        CKEditorModule,
        UserActionRoutingModule,
        UIModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgbCollapseModule,
        NgbDropdownModule,
        FormsModule,
        Ng2SmartTableModule,
        CarouselModule,
        NgApexchartsModule,
        NgbNavModule,
    ]
})
export class UserActionModule {
}
