import {Component, OnInit} from '@angular/core';
import {User} from '../../_models';
import {AlertService, AuthenticationService, EmployeeService} from '../../_services';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  templateUrl: 'employeeProfile.component.html',
  styleUrls: ['employeeProfile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  currentUser: User;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  id: number;

  constructor(private location: Location, private formBuilder: FormBuilder,
              private router: Router, private alertService: AlertService, private employeeService: EmployeeService,
              private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = this.currentUser.id;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  backClicked() {
    this.location.back();
  }

  public ngOnInit() {
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
    this.editForm = this.formBuilder.group({
      id: this.id,
      oldPassword: null,
      password: null,
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      address: null,
    });

    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployee(this.id).subscribe(data => this.user = data['result']);
  }


  onSubmit() {
    if (window.confirm('Are sure you want to update profile information ?')) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.editForm.invalid) {
        return;
      }

      this.loading = true;
      this.employeeService.editForEmployee(this.editForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Update Employee successful', true);
            this.router.navigate(['/']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

}
