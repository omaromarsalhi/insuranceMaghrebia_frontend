import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Claim, ClaimStatus } from '../../models/claim';

@Component({
  selector: 'app-claims-page',
  templateUrl: './claims-page.component.html',
  styleUrls: ['./claims-page.component.scss']
})
export class ClaimsPageComponent implements OnInit {
  claimStatus = ClaimStatus;
  constructor(
    private claimService: ClaimService
  ) { }
  breadCrumbItems: Array<{}>;
  claims!: Claim[];

  
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Projects' }, { label: 'Projects List', active: true }];
    this.claimService.getClaims().subscribe(data=>{
      this.claims = data;
    });
  }

}
