import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';




@Component({
  selector: 'app-quote-appointment',
  templateUrl: './quote-appointment.component.html',
  styleUrls: ['../../form.css','./quote-appointment.component.css'],
   animations: [
      trigger('fadeInOut', [
          transition(':enter', [
              style({ opacity: 0 }),
              animate('150ms ease-out', style({ opacity: 1 }))
          ]),
          transition(':leave', [
              animate('100ms ease-in', style({ opacity: 0 }))
          ])
      ]),
      trigger('slideIn', [
          transition(':enter', [
              style({ transform: 'translateY(-20px)', opacity: 0 }),
              animate('200ms 100ms ease-out', 
                  style({ transform: 'translateY(0)', opacity: 1 }))
          ])
      ])
  ]
})
export class QuoteAppointmentComponent {

}
