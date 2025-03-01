import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangeDialogComponent } from './email-change-dialog.component';

describe('EmailChangeDialogComponent', () => {
  let component: EmailChangeDialogComponent;
  let fixture: ComponentFixture<EmailChangeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailChangeDialogComponent]
    });
    fixture = TestBed.createComponent(EmailChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
