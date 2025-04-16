import { Component, OnInit } from "@angular/core";
import { DecimalPipe } from "@angular/common";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppointmentControllerService } from "src/app/core/services/offer/appointment-controller.service";
import { AppointmentDto } from "src/app/core/models/offer/appointment-dto";

@Component({
  selector: "app-appointment",
  templateUrl: "./appointment.component.html",
  styleUrls: ["./appointment.component.scss"]
})
export class AppointmentComponent implements OnInit {



  selectedAppointment: any;
  selectedAutomobile: any;
  appointments:AppointmentDto[]=[];

  constructor(private modalService: NgbModal,private appointmentService:AppointmentControllerService) {

  }

  ngOnInit(): void {
   

    this.__fetch();
  }

  private __fetch(){
    this.appointmentService.getAll().subscribe(
      (result)=>{
          this.appointments=result;
      }
    )
  }
  


  openDetails(appointment: AppointmentDto, content: any): void {
    this.selectedAppointment = appointment;
    this.modalService.open(content, { 
      size: 'lg', 
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    });
  }
}
