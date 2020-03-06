import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {User} from '../../../_models';
import {AlertService, AuthenticationService, DepartmentService} from '../../../_services';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'addDepartment.component.html',
  styleUrls: ['addDepartment.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  currentUser: User;
  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private location: Location,
              private departmentService: DepartmentService, private formBuilder: FormBuilder,
              private router: Router, private alertService: AlertService,
              private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }

  backClicked() {
    this.location.back();
  }

  public ngOnInit(): void {
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

    this.addForm = this.formBuilder.group({
      deptName: null
    });

  }


  onSubmit() {
    if (window.confirm('Are sure you want to add this department ?')) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addForm.invalid) {
        return;
      }

      this.loading = true;
      this.departmentService.addNewDept(this.addForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Add New Department successful', true);
            this.router.navigate(['/admin/viewDepartments']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }
}
