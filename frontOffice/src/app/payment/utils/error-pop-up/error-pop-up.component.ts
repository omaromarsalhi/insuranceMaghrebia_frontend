import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-pop-up',
  templateUrl: './error-pop-up.component.html',
  styleUrls: ['./error-pop-up.component.css']
})
export class ErrorPopUpComponent {

  isOpen = false;
  @Input() title: string = '';

  @Input() message: string = '';


  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }


}
