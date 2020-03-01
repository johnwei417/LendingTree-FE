import {Component, OnInit} from '@angular/core';
import {Employee, User} from '../../../_models';
import {AuthenticationService, EmployeeService} from '../../../_services';

@Component({
  templateUrl: 'viewEmployee.component.html',
})

export class ViewEmployeeComponent implements OnInit {
  currentUser: User;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.getEmployees();
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

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => this.employees = data['result']);
  }
}