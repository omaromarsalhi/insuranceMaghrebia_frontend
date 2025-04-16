import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() title: string = '';  // Message dynamique pour le titre
  @Input() message: string = ''; // Message dynamique pour le contenu
  @Input() showPopup!: boolean; // "showPopup" avec un P majuscule

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();  // Émet l'événement pour fermer le popup
  }
}
