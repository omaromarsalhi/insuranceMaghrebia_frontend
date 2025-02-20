import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTypeListComponent } from './incident-type-list.component';

describe('IncidentTypeListComponent', () => {
  let component: IncidentTypeListComponent;
  let fixture: ComponentFixture<IncidentTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
