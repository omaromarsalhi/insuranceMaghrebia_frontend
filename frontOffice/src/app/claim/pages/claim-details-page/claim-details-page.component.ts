import { Component, OnInit } from '@angular/core';
import { ClaimService } from '../../services/claim.service';
import { ActivatedRoute } from '@angular/router';
import { Claim, ClaimStatus } from '../../models/claim';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Response } from '../../models/response';
import { ResponseService } from '../../services/response.service';

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
    private fb: FormBuilder
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
          userId: "67b70e8dcb390f459e59930f",
          claimStatus: ClaimStatus.OPEN,
        }
      ).subscribe(data => {
        let r = new Response();
        let user = new User();
        user.id = '67b70e8dcb390f459e59930f';
        user.firstName = '7amadi';
        user.lastName = '7amadi';
        r.respondedAt = new Date(); 
        r.response = this.response!.value;
        r.user = user;
        this.claim.responses.push(r);
        this.response?.setValue("");
      });
    }
  }
}
