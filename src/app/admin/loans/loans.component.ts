import {Component, OnInit} from '@angular/core';
import {Loan} from '../../_models';
import {LoanService} from '../../_services';
import {first} from 'rxjs/operators';


@Component({templateUrl: 'loans.component.html'})
export class LoanManageComponent implements OnInit {
  loans: Loan[];

  constructor(private loanService: LoanService) {

  }

  ngOnInit() {
    this.getLoans();
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
