import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDetailsPageComponent } from './claim-details-page.component';

describe('ClaimDetailsPageComponent', () => {
  let component: ClaimDetailsPageComponent;
  let fixture: ComponentFixture<ClaimDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimDetailsPageComponent]
    });
    fixture = TestBed.createComponent(ClaimDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
