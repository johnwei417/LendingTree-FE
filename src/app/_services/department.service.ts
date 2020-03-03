import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Department} from '../_models';

@Injectable()
export class DepartmentService {
  constructor(private http: HttpClient) {
  }

  getAllDepartments() {
    return this.http.get<Department[]>(`${environment.apiUrl}/admin/departments/list`);
  }

  addNewDept(department: Department) {
    return this.http.post<Department>(`${environment.apiUrl}/admin/departments/addNew`, department);
  }

  editDepartment(id: number, department: Department) {
    return this.http.put<Department>(`${environment.apiUrl}/admin/departments/edit/` + id, department);
  }

  getDeptById(id: number) {
    return this.http.get<Department>(`${environment.apiUrl}/admin/departments/` + id);
  }
}
