import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Claim, ClaimStatus } from "../../models/claim";
import { ClaimService } from "../../services/claim.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Response } from "../../models/response";
import { ResponseService } from "../../services/response.service";
import { User } from "../../../core/models/user/user";
import * as L from "leaflet";
import { NgModel } from "@angular/forms";
import { DamageReport } from "../../transfer/DTOs/DamageReport";
import { AuthService } from "src/app/core/services/user/auth.service";
import { UserService } from "src/app/core/services/user/user.service";



@Component({
  selector: "app-claim-details-page",
  templateUrl: "./claim-details-page.component.html",
  styleUrls: ["./claim-details-page.component.scss"],
})
export class ClaimDetailsPageComponent implements OnInit {
  imageDisplay: number = 1;
  breadCrumbItems: Array<{}>;
  claim: Claim = new Claim();
  responseForm: FormGroup;
  loading: string[];
  estimated: DamageReport[];

  isSwitchOn: boolean;

  leafletMap!: any;
  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService,
    private responseService: ResponseService,
    private fb: FormBuilder,
    private authService : AuthService,
    private userService : UserService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Blog" },
      { label: "Blog Grid", active: true },
    ];
    let id = this.route.snapshot.paramMap.get("id");
    this.claimService.getClaim(id).subscribe((data) => {
      this.claim = data;
      this.isSwitchOn = this.claim.status != ClaimStatus.CLOSED
      this.loading = new Array(this.claim.images.length).fill(["notyet"]);
      this.estimated = new Array(this.claim.images.length);

      this.initializeMap();
    });
    this.responseForm = this.fb.group({
      response: ["", [Validators.required, Validators.minLength(10)]],
    });
  }
  get response() {
    return this.responseForm.get("response");
  }
  changeDisplay(display: number) {
    this.imageDisplay = display;
  }
  onSubmit() {
    if (this.responseForm) {
      this.responseService
        .save({
          claimId: this.claim.id,
          response: this.response.value,
          userId: this.authService.getCurrentUserId(),
          claimStatus: ClaimStatus.AWAITING_RESPONSE,
        })
        .subscribe((data) => {
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

  initializeMap() {
    let coords: number[] = this.claim.locationCoordinates.split(",")
                                                          .map((coord) => parseFloat(coord));
    console.log(coords);
    this.leafletMap = L.map("map").setView([coords[0], coords[1]], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.leafletMap);
    
    L.marker([coords[0], coords[1]]).addTo(this.leafletMap);
  }

  onSwitchChange(newValue: boolean) {
    this.claimService.toggleClosed(this.claim.id, newValue).subscribe();
  }

  getCostEstimate(image: string, index: number){
    this.loading[index] = "loading";
    this.claimService.getDamageEstimate(image).subscribe(
      data => {
        this.loading[index] = "done";
        this.estimated[index] = data;
      }
    )
  }


















 
}














