import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:backOffice/src/app/pages/hr/jobs/jobs.component.spec.ts
import { JobsComponent } from './jobs.component';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsComponent ]
========
import { ClaimsMapComponent } from './claims-map.component';

describe('ClaimsMapComponent', () => {
  let component: ClaimsMapComponent;
  let fixture: ComponentFixture<ClaimsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsMapComponent ]
>>>>>>>> claim_branch:backOffice/src/app/claims/components/claims-map/claims-map.component.spec.ts
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<<< HEAD:backOffice/src/app/pages/hr/jobs/jobs.component.spec.ts
    fixture = TestBed.createComponent(JobsComponent);
========
    fixture = TestBed.createComponent(ClaimsMapComponent);
>>>>>>>> claim_branch:backOffice/src/app/claims/components/claims-map/claims-map.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
