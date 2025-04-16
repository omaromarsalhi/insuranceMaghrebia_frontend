import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";


@Component({
  selector: 'app-appointment-manager',
  templateUrl: './appointment-manager.component.html',
  styleUrls: ['./appointment-manager.component.scss'],
  animations: [
      trigger("scaleFade", [
        transition(":enter", [
          style({ opacity: 0, transform: "scale(0.95)" }),
          animate("300ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
        ]),
        transition(":leave", [
          animate(
            "300ms ease-in",
            style({ opacity: 0, transform: "scale(0.95)" })
          ),
        ]),
      ]),
      trigger("slideVertical", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateY(20px)" }),
          animate(
            "300ms 150ms ease-out",
            style({ opacity: 1, transform: "translateY(0)" })
          ),
        ]),
        transition(":leave", [
          animate(
            "300ms ease-in",
            style({ opacity: 0, transform: "translateY(-20px)" })
          ),
        ]),
      ]),
      trigger("slideHorizontal", [
        transition(":enter", [
          style({ opacity: 0, transform: "translateX(30px)" }),
          animate(
            "300ms ease-out",
            style({ opacity: 1, transform: "translateX(0)" })
          ),
        ]),
        transition(":leave", [
          animate(
            "300ms ease-in",
            style({ opacity: 0, transform: "translateX(30px)" })
          ),
        ]),
      ]),
    ],
})
export class AppointmentManagerComponent implements OnInit {
  isChatOpen = false;

  breadCrumbItems: Array<{}>;
  
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Appointments" },
      { label: "Appointment", active: true },
    ];
  }

}
