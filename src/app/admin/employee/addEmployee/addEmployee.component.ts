import {Component, OnInit} from '@angular/core';
import {Department, User} from '../../../_models';
import {AlertService, AuthenticationService, EmployeeService, UserService} from '../../../_services';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({templateUrl: 'addEmployee.component.html'})
export class AddEmployeeComponent implements OnInit {

  departments: Department[];
  currentUser: User;
  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
              private router: Router, private alertService: AlertService, private userService: UserService,
              private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }

  get deptId() {
    return this.addForm.get('deptId');
  }

  changeDept(e) {
    this.deptId.setValue(e.target.value, {
      onlySelf: true
    });
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
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      deptId: ['', Validators.required]
    });

    this.getDept();
  }

  getDept() {
    this.employeeService.getDeptList().subscribe(data => this.departments = data['result']);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.registerEmployee(this.addForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Add New Employee successful', true);
          this.router.navigate(['/admin/viewEmployees']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}
