import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Department, Employee, User} from '../_models';

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

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${environment.apiUrl}/admin/employees/` + id);
  }

  deleteById(id: number) {
    return this.http.delete<Employee>(`${environment.apiUrl}/admin/employees/` + id);
  }

  edit(id: number, user: User) {
    return this.http.put<User>(`${environment.apiUrl}/admin/employees/edit/` + id, user);
  }

  editForEmployee(user: User) {
    return this.http.put<User>(`${environment.apiUrl}/employee/profile/edit`, user);
  }

  getEmployee(id: number) {
    return this.http.get<Employee>(`${environment.apiUrl}/employee/profile/` + id);
  }


}
