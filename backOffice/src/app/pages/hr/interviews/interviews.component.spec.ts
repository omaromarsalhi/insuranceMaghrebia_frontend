import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:backOffice/src/app/pages/hr/interviews/interviews.component.spec.ts
import { InterviewsComponent } from './interviews.component';

describe('InterviewsComponent', () => {
  let component: InterviewsComponent;
  let fixture: ComponentFixture<InterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewsComponent ]
========
import { ClaimDetailsPageComponent } from './claim-details-page.component';

describe('ClaimDetailsPageComponent', () => {
  let component: ClaimDetailsPageComponent;
  let fixture: ComponentFixture<ClaimDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimDetailsPageComponent ]
>>>>>>>> claim_branch:backOffice/src/app/claims/components/claim-details-page/claim-details-page.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:backOffice/src/app/pages/hr/interviews/interviews.component.spec.ts
    fixture = TestBed.createComponent(InterviewsComponent);
========
    fixture = TestBed.createComponent(ClaimDetailsPageComponent);
>>>>>>>> claim_branch:backOffice/src/app/claims/components/claim-details-page/claim-details-page.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
