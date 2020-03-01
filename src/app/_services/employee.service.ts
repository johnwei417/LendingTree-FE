import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Department, Employee} from '../_models';

@Injectable()
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAllEmployees() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/admin/employees`);
  }

  getDeptList() {
    return this.http.get<Department[]>(`${environment.apiUrl}/common/listDepts`);
  }
  deleteById(id: number) {
    return this.http.delete<Employee>(`${environment.apiUrl}/admin/employees/` + id);
  }


}
