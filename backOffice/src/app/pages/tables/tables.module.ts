import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UIModule} from '../../shared/ui/ui.module';
import {NgbCollapseModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {TablesRoutingModule} from './tables-routing.module';
import {AdvancedSortableDirective} from './advancedtable/advanced-sortable.directive';
import {AdvancedtableComponent} from './advancedtable/advancedtable.component';

@NgModule({
    declarations: [AdvancedtableComponent, AdvancedSortableDirective],
    imports: [
        CommonModule,
        TablesRoutingModule,
        UIModule,
        NgbPaginationModule,
        NgbTypeaheadModule,
        NgbCollapseModule,
        NgbDropdownModule,
        FormsModule,
        Ng2SmartTableModule
    ]
})
export class TablesModule {
}
