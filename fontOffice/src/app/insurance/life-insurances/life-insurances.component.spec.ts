import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeInsurancesComponent } from './life-insurances.component';

describe('LifeInsurancesComponent', () => {
  let component: LifeInsurancesComponent;
  let fixture: ComponentFixture<LifeInsurancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifeInsurancesComponent]
    });
    fixture = TestBed.createComponent(LifeInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
