import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Department, User} from '../../../_models';
import {AuthenticationService, DepartmentService} from '../../../_services';

@Component({
  templateUrl: 'viewDepartments.component.html',
  styleUrls: ['viewDepartments.component.css'],
})

export class ViewDepartmentsComponent implements OnInit {
  currentUser: User;
  departments: Department[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private location: Location, private departmentService: DepartmentService, private authenticationService: AuthenticationService) {
  }


  ngOnInit() {
    this.getDepartments();
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


  getDepartments() {
    this.departmentService.getAllDepartments().subscribe(data => this.departments = data['result']);
  }
}
