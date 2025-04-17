import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NgbDate, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { IncidentTypeService } from "../../services/incident-type.service";
import { IncidentType } from "../../models/IncidentType";

@Component({
  selector: "app-create-incident-page",
  templateUrl: "./create-incident-page.component.html",
  styleUrls: ["./create-incident-page.component.scss"],
})
export class CreateIncidentPageComponent implements OnInit {
  constructor(private fb: FormBuilder, private incidentTypeService: IncidentTypeService) {}
  // bread crumb items
  breadCrumbItems: Array<{}>;
  incidentForm: FormGroup;
  submitted : boolean = false;
  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Incident Type" },
      { label: "Create New", active: true },
    ];
    this.incidentForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]], // Min length validation
      description: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    
    if (this.incidentForm.valid) {
      var incidentType: IncidentType = this.incidentForm.value
      console.log(incidentType);
      this.incidentTypeService.addIncidentType(incidentType).subscribe(data=> {
        console.log(data);
      })
    } else {
      this.submitted = true;
    }
  }
}
