import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Bank, Loan, LoanType, User} from '../_models';

@Injectable()
export class LoanService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Loan[]>(`${environment.apiUrl}/admin/loanviewer`);
  }

  assignToPick(loan: Loan) {
    return this.http.put<Loan>(`${environment.apiUrl}/admin/loanviewer`, loan);
  }

  getAllForCustomer(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/customer/loans/list`, user);
  }

  addNewLoan(loan: Loan) {
    return this.http.post<Loan>(`${environment.apiUrl}/customer/loans/add`, loan);
  }

  getBanks() {
    return this.http.get<Bank[]>(`${environment.apiUrl}/common/listBanks`);
  }

  getLoanTypes() {
    return this.http.get<LoanType[]>(`${environment.apiUrl}/common/listLoanTypes`);
  }

}
