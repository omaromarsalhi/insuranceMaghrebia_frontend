import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncidentPageComponent } from './create-incident-page.component';

describe('CreateIncidentPageComponent', () => {
  let component: CreateIncidentPageComponent;
  let fixture: ComponentFixture<CreateIncidentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIncidentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncidentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
