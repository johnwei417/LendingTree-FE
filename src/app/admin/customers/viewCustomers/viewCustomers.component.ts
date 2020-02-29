import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../_models';
import {CustomerService} from '../../../_services';

@Component({
  templateUrl: 'viewCustomers.component.html',
})

export class ViewCustomersComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {
  }


  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.customerService.getAllCustomer().subscribe(data => this.customers = data['result']);
  }
}
