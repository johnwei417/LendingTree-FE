import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Loan, User} from '../../_models';
import {AuthenticationService, LoanService} from '../../_services';


@Component({
  templateUrl: 'customerRejectedLoans.component.html',
  styleUrls: ['customerRejectedLoans.component.css'],
})
export class CustomerRejectedLoansComponent implements OnInit {
  currentUser: User;
  loans: Loan[];

  constructor(private location: Location, private loanService: LoanService, private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getLoans();
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

  getLoans() {
    const user = {
      id: this.currentUser.id,
      username: this.currentUser.username,
      password: null,
      firstname: null,
      lastname: null,
      email: null,
      salary: null,
      phone: null,
      role: null,
      address: null,
      deptId: null,
    };
    this.loanService.getRejectedLoansForCustomer(user).subscribe(data => this.loans = data['result']);
  }

}
