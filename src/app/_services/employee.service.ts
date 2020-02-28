import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Employee} from '../_models';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAllEmployees() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/admin/employees`);
  }


}
