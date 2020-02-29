import {Component, OnInit} from '@angular/core';
import {Loan, User} from '../../_models';
import {AuthenticationService, LoanService, UserService} from '../../_services';
import {first} from 'rxjs/operators';


@Component({templateUrl: 'employeeLoan.component.html'})
export class EmployeeLoanComponent implements OnInit {
  loans: Loan[];
  currentUser: User;
  user: User;

  constructor(private loanService: LoanService, private userService: UserService, private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
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
