import {Component, OnInit} from '@angular/core';
import {Department, User} from '../../../_models';
import {AlertService, AuthenticationService, DepartmentService, UserService} from '../../../_services';
import {first} from 'rxjs/operators';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: 'editDepartment.component.html',
  styleUrls: ['editDepartment.component.css'],
})
export class EditDepartmentComponent implements OnInit {

  department: Department;
  currentUser: User;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  id: number;

  constructor(private location: Location, private departmentService: DepartmentService, private formBuilder: FormBuilder,
              private router: Router, private alertService: AlertService, private userService: UserService,
              private authenticationService: AuthenticationService, private activatedRoute: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
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
      deptName: null
    });
    this.getDept();
  }

  getDept() {
    this.departmentService.getDeptById(this.id).subscribe(data => this.department = data['result']);
  }

  onSubmit() {
    if (window.confirm('Are sure you want to update this department ?')) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.editForm.invalid) {
        return;
      }

      this.loading = true;
      this.departmentService.editDepartment(this.id, this.editForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Update Department successful', true);
            this.router.navigate(['/admin/viewDepartments']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

}
