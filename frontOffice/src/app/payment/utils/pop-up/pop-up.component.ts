import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {

  @Input() title: string = '';

  @Input() message: string = '';


  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }


}
