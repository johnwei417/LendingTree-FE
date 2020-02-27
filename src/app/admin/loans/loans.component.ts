import {Component, OnInit} from '@angular/core';
import {Loan} from '../../_models';
import {LoanService} from '../../_services';


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

}
