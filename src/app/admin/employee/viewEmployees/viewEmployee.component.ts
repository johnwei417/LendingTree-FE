import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../_models';
import {AuthenticationService, EmployeeService} from '../../../_services';

@Component({
  templateUrl: 'viewEmployee.component.html',
})

export class ViewEmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.getEmployees();
    this.authenticationService.loggedIn.next(true);
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => this.employees = data['result']);
  }
}
