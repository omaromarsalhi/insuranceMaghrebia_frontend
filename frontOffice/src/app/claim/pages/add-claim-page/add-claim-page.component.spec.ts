import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimPageComponent } from './add-claim-page.component';

describe('AddClaimPageComponent', () => {
  let component: AddClaimPageComponent;
  let fixture: ComponentFixture<AddClaimPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClaimPageComponent]
    });
    fixture = TestBed.createComponent(AddClaimPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
