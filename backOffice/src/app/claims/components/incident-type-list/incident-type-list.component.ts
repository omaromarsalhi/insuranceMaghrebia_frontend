import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidentTypeService } from '../../services/incident-type.service';
import { IncidentType } from '../../models/IncidentType';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-incident-type-list',
  templateUrl: './incident-type-list.component.html',
  styleUrls: ['./incident-type-list.component.scss']
})
export class IncidentTypeListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  incidentForm: FormGroup;
  submitted : boolean = false;
  status: boolean;
  incidentTypes: IncidentType[];
  constructor(private modalService: NgbModal, private fb: FormBuilder, private incidentTypeService: IncidentTypeService) { }

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Incident Type" },
      { label: "Create New", active: true },
    ];
    this.incidentForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]], // Min length validation
      description: ["", [Validators.required, Validators.minLength(10)]],
      active: [true],
    });

    this.loadIncidentTypes();
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any, action: string) {
    if(action == 'new')
      this.incidentForm.patchValue({
        name: '',
        description: '',
        
      });
    
    this.modalService.open(content);
  }

private loadIncidentTypes(){
  this.incidentTypeService.findAllIncidentTypes().subscribe(data=>{
    this.incidentTypes = data;
  })
}
onSubmit() {
  console.log(    this.incidentForm.controls.active.value)
    if (this.incidentForm.valid) {
      var incidentType: IncidentType = this.incidentForm.value
      this.incidentTypeService.addIncidentType(incidentType).subscribe(data=> {
        this.loadIncidentTypes();
      })
    } else {
      this.submitted = true;
    }
  }

  deleteIncidentType(id: string){
    this.incidentTypeService.deleteIncidentType(id).subscribe(data => {
      this.loadIncidentTypes();
    });
  }
}
