import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models';
import {AlertService, AuthenticationService, CustomerService, UserService} from '../../../_services';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({templateUrl: 'editCustomer.component.html'})
export class EditCustomerComponent implements OnInit {


  currentUser: User;
  editForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  id: number;

  constructor(private location: Location, private customerService: CustomerService, private formBuilder: FormBuilder,
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
      password: null,
      firstname: null,
      lastname: null,
      email: null,
      phone: null,
      salary: null,
    });
    this.getCustomerById();
  }


  getCustomerById() {
    this.customerService.getCustomerById(this.id).subscribe(data => this.user = data['result']);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.edit(this.id, this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update Customer successful', true);
          this.router.navigate(['/admin/viewCustomers']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

}
