import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../models/claim';

@Component({
  selector: 'app-claims-page',
  templateUrl: './claims-page.component.html',
  styleUrls: ['./claims-page.component.css']
})
export class ClaimsPageComponent implements OnInit{

  claims!: Claim[];
  constructor(
    private claimService: ClaimService,
  ){}
  ngOnInit(): void {
    this.claimService.getUserClaims('67b70e8dcb390f459e59930f').subscribe(data=> {
      this.claims = data;
    }
    );
  }
}
