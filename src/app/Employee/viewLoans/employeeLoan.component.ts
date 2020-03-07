import {Component, OnInit} from '@angular/core';
import {Customer, Loan, User} from '../../_models';
import {AuthenticationService, EmployeeService, LoanService, UserService} from '../../_services';
import {first} from 'rxjs/operators';


@Component({
  templateUrl: 'employeeLoan.component.html',
  styleUrls: ['employeeLoan.component.css']
})
export class EmployeeLoanComponent implements OnInit {
  loans: Loan[];
  currentUser: User;
  user: User;
  customer: Customer;
  searchText;

  constructor(private loanService: LoanService, private userService: UserService,
              private employeeService: EmployeeService,
              private authenticationService: AuthenticationService) {
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

  getCustomer(username: string) {
    this.employeeService.getCustomer(username).subscribe(data => this.customer = data['result']);
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
    if (window.confirm('Are sure you want to approve this loan ?')) {
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
  }

  reject(loanId: number) {
    if (window.confirm('Are sure you want to reject this loan ?')) {
      this.loanService.rejectLoan(loanId).pipe(first()).subscribe(() => {
        this.getLoans();
      });
    }
  }

}
