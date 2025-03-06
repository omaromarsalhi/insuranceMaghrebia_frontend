import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Claim, ClaimStatus } from '../../models/claim';
import { ClaimService } from '../../services/claim.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '../../models/response';
import { ResponseService } from '../../services/response.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-claim-details-page',
  templateUrl: './claim-details-page.component.html',
  styleUrls: ['./claim-details-page.component.scss']
})
export class ClaimDetailsPageComponent implements OnInit {

  imageDisplay: number = 1;
  breadCrumbItems: Array<{}>;
  claim!: Claim;
  responseForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService,
    private responseService: ResponseService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Blog' }, { label: 'Blog Grid', active: true }];
      let id = this.route.snapshot.paramMap.get('id');
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
  changeDisplay(display: number){
    this.imageDisplay = display;
  }
  onSubmit(){
    if(this.responseForm){
      this.responseService.save(
        {
          claimId: this.claim.id,
          response: this.response.value,
          userId: "67c89296b3026f2d6ba56cfc",
          claimStatus: ClaimStatus.AWAITING_RESPONSE
        }
      ).subscribe(data => {
        let r = new Response();
        let user = new User();
        user.id = '67c89296b3026f2d6ba56cfc';
        user.firstName = 'Admoun';
        user.lastName = '9wey';
        r.respondedAt = new Date(); 
        r.response = this.response.value;
        r.user = user;
        this.claim.responses.push(r);
        this.response.setValue("");
      });
    }
  }

}
