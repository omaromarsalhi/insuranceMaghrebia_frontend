import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentDto } from "src/app/core/models/offer/appointment-dto";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"],
})
export class AppointmentComponent implements OnInit, OnChanges {
  selectedAppointment: any;
  selectedAutomobile: any;
  isLoading: boolean = true;
  @Input() appointments: AppointmentDto[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["appointments"] && this.appointments.length > 0)
      this.isLoading = false;
  }

  openDetails(appointment: AppointmentDto, content: any): void {
    this.selectedAppointment = appointment;
    this.modalService.open(content, {
      size: "lg",
      centered: true,
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
