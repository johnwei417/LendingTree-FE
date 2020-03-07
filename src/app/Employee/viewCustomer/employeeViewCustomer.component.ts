import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthenticationService, EmployeeService} from '../../_services';
import {Customer, User} from '../../_models';

@Component({
  templateUrl: 'employeeViewCustomer.component.html',
  styleUrls: ['employeeViewCustomer.component.css'],
})

export class EmployeeViewCustomerComponent implements OnInit {

  customer: Customer;
  currentUser: User;
  username: string;

  constructor(private location: Location, private employeeService: EmployeeService, private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.username = params['username'];
    });
    this.getCustomerByUsername(this.username);
    this.authenticationService.loggedIn.next(true);
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.role[0] === 'ROLE_ADMIN') {
      this.authenticationService.admin.next(true);
    } else {
      this.authenticationService.admin.next(false);
    }

    if (this.currentUser.role[0] === 'ROLE_CUSTOMER') {
      this.authenticationService.customer.next(true);
    } else {
      this.authenticationService.customer.next(false);
    }

    if (this.currentUser.role[0] !== 'ROLE_CUSTOMER' && this.currentUser.role[0] !== 'ROLE_ADMIN') {
      this.authenticationService.employee.next(true);
    } else {
      this.authenticationService.employee.next(false);
    }
  }


  backClicked() {
    this.location.back();
  }

  getCustomerByUsername(username: string) {
    this.employeeService.getCustomer(username).subscribe(data => this.customer = data['result']);
  }
}
