import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-email-change-dialog',
  templateUrl: './email-change-dialog.component.html',
  styleUrls: ['./email-change-dialog.component.css']
})
export class EmailChangeDialogComponent {
  constructor(public dialogRef: MatDialogRef<EmailChangeDialogComponent>) {
    dialogRef.disableClose = true;
  }

}
