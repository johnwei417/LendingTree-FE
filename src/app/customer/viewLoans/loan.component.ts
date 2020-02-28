import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../_models';
import {LoanService, UserService} from '../../_services';


@Component({templateUrl: 'loan.component.html'})
export class CustomerLoanComponent implements OnInit {
  loans: Loan[];
  currentUser: User;
  user: User;

  constructor(private loanService: LoanService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getLoans();
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
    this.loanService.getAllForCustomer(user).subscribe(data => this.loans = data['result']);
  }

}
