import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../../_models';
import {AuthenticationService, CustomerService} from '../../../_services';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';


@Component({templateUrl: 'viewCustomerLoans.component.html'})
export class ViewCustomerLoansComponent implements OnInit {
  currentUser: User;
  loans: Loan[];
  id: number;
  user: User;

  constructor(private location: Location, private customerService: CustomerService, private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getLoans(this.id);
    this.getCustomerById(this.id);
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

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id).subscribe(data => this.user = data['result']);
  }

  getLoans(id: number) {
    this.customerService.getLoanById(id).subscribe(data => this.loans = data['result']);
  }


}
