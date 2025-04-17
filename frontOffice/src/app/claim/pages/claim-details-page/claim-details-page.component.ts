import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { ActivatedRoute } from '@angular/router';
import { Claim, ClaimStatus } from '../../models/claim';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/models/user/user';
import { Response } from '../../models/response';
import { ResponseService } from '../../services/response.service';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-claim-details-page',
  templateUrl: './claim-details-page.component.html',
  styleUrls: ['./claim-details-page.component.css']
})
export class ClaimDetailsPageComponent implements OnInit {
  claim!: Claim;
  responseForm!: FormGroup;



  constructor(
    private claimService: ClaimService,
    private responseService: ResponseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService : AuthService,
    private userService : UserService
  ){

  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
      this.claimService.getClaim(id).subscribe(data =>{
        this.claim = data;
      })
      this.responseForm = this.fb.group({
        response: ["", [Validators.required, Validators.minLength(10)]],
      });
  }
  get response(){
    return this.responseForm.get('response');
  }

  onSubmit(){
    if(this.responseForm.valid){
      this.responseService.save(
        {
          claimId: this.claim.id,
          response: this.response!.value,
          userId: this.authService.getCurrentUserId()!,
          claimStatus: ClaimStatus.OPEN,
        }
      ).subscribe(data => {
        this.userService.getProfile(this.authService.getCurrentUserId()).subscribe((data)=> {
          let r = new Response();
          let user : User;
          user=data;
          r.respondedAt = new Date(); 
          r.response = this.response!.value;
          r.user = user;
          this.claim.responses.push(r);
        this.response?.setValue("");
        this.response?.markAsUntouched();
        });
      });
    }
  }
}
