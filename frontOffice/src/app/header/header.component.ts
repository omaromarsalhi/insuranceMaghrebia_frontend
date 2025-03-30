import { Component, OnInit } from '@angular/core';
import { OfferCategoryControllerService } from '../core/services';
import { CategoryResponse } from '../core/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  partivularcategroList: CategoryResponse[]=[];

  constructor(private categoryService:OfferCategoryControllerService){}

  ngOnInit(): void {
      this._fetchCtaegories('PARTICULAR');
  }

  private _fetchCtaegories(target:'PARTICULAR'|'COMPANY'){
    this.categoryService.getAllByTarget({target}).subscribe((response)=>{
        this.partivularcategroList=response;
    })
  }
}