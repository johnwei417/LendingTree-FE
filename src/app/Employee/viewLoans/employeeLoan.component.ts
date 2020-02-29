import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../_models';
import {LoanService, UserService} from '../../_services';
import {first} from 'rxjs/operators';


@Component({templateUrl: 'employeeLoan.component.html'})
export class EmployeeLoanComponent implements OnInit {
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
    this.loanService.getAllForEmployee(user).subscribe(data => this.loans = data['result']);
  }

  approve(loanid: number) {
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
    this.loanService.assignToNextDept(user, loanid).pipe(first()).subscribe(() => {
      this.getLoans();
    });
  }

  reject(loanId: number) {
    this.loanService.rejectLoan(loanId).pipe(first()).subscribe(() => {
      this.getLoans();
    });
  }

}
