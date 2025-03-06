import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsPageComponent } from './claims-page.component';

describe('ClaimsPageComponent', () => {
  let component: ClaimsPageComponent;
  let fixture: ComponentFixture<ClaimsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimsPageComponent]
    });
    fixture = TestBed.createComponent(ClaimsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
