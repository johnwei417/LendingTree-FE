import {Component, OnInit} from '@angular/core';
import {Loan} from '../../_models';
import {AuthenticationService, LoanService} from '../../_services';
import {first} from 'rxjs/operators';


@Component({templateUrl: 'loans.component.html'})
export class LoanManageComponent implements OnInit {
  loans: Loan[];

  constructor(private loanService: LoanService, private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.getLoans();
  }


  getLoans() {
    this.authenticationService.loggedIn.next(true);
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
