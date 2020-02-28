import {Component, OnInit} from '@angular/core';
import {Employee} from '../../../_models';
import {EmployeeService} from '../../../_services';

@Component({
  templateUrl: 'viewEmployee.component.html',
})

export class ViewEmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {
  }


  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => this.employees = data['result']);
  }
}
