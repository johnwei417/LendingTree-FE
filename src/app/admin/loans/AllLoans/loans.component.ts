import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../../_models';
import {AuthenticationService, LoanService} from '../../../_services';
import {first} from 'rxjs/operators';


@Component({templateUrl: 'loans.component.html'})
export class LoanManageComponent implements OnInit {
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
    this.loanService.getAll().subscribe(data => this.loans = data['result']);
  }

  assign(loanid: number) {
    let loan: Loan = {
      id: loanid,
      userId: null,
      cusId: null,
      amount: null,
      deptId: null,
      bankId: null,
      loantypeId: null,
      loanstatusId: null
    };
    this.loanService.assignToPick(loan).pipe(first()).subscribe(() => {
      this.getLoans();
    });
  }

}