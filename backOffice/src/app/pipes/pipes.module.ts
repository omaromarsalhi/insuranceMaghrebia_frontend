import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterPipe } from './category-filter.pipe';



@NgModule({
  declarations: [CategoryFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [
      CategoryFilterPipe
    ]
})
export class PipesModule { }
