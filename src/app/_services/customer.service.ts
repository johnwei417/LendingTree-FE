import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Customer, User} from '../_models';


@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getAllCustomer() {
    return this.http.get<Customer[]>(`${environment.apiUrl}/admin/customers`);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${environment.apiUrl}/admin/customers/` + id);
  }

  deleteById(id: number) {
    return this.http.delete<Customer>(`${environment.apiUrl}/admin/customers/` + id);
  }

  edit(id: number, user: User) {
    return this.http.put<User>(`${environment.apiUrl}/admin/customers/edit/` + id, user);
  }
}
