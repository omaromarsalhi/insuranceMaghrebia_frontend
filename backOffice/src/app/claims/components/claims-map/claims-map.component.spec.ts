import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsMapComponent } from './claims-map.component';

describe('ClaimsMapComponent', () => {
  let component: ClaimsMapComponent;
  let fixture: ComponentFixture<ClaimsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
