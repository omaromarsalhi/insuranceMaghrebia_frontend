import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Customers } from './category.model';

import { customersData } from './data';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

/**
 * Ecomerce category component
 */
export class CategoryComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];

  term: any;

  // page
  currentpage: number;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Customers', active: true }];

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.customersData = customersData;
  }
  get form() {
    return this.formData.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
     const name = this.formData.get('name').value;
     const description = this.formData.get('description').value;

  
      this.modalService.dismissAll()
    }
    this.submitted = true
  }
}
