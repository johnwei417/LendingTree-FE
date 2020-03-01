import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../../_models';
import {AuthenticationService, LoanService} from '../../../_services';


@Component({templateUrl: 'pendingLoans.component.html'})
export class PendingLoansComponent implements OnInit {
  currentUser: User;
  loans: Loan[];

  constructor(private loanService: LoanService, private authenticationService: AuthenticationService) {

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


  getLoans() {
    this.loanService.getPendingLoans().subscribe(data => this.loans = data['result']);
  }

}
