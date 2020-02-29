import {Component, OnInit} from '@angular/core';
import {Customer} from '../../../_models';
import {AuthenticationService, CustomerService} from '../../../_services';

@Component({
  templateUrl: 'viewCustomers.component.html',
})

export class ViewCustomersComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.getEmployees();
    this.authenticationService.loggedIn.next(true);
  }

  getEmployees() {
    this.customerService.getAllCustomer().subscribe(data => this.customers = data['result']);
  }
}
