import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Customer} from '../_models';


@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  getAllCustomer() {
    return this.http.get<Customer[]>(`${environment.apiUrl}/admin/customers`);
  }
}
