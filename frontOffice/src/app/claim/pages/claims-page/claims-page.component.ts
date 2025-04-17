import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { Claim } from '../../models/claim';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: 'app-claims-page',
  templateUrl: './claims-page.component.html',
  styleUrls: ['./claims-page.component.css']
})
export class ClaimsPageComponent implements OnInit{

  claims!: Claim[];
  constructor(
    private claimService: ClaimService,
    private authService : AuthService
  ){}
  ngOnInit(): void {
    this.claimService.getUserClaims(this.authService.getCurrentUserId()!).subscribe(data=> {
      this.claims = data;
    }
    );
  }
}
