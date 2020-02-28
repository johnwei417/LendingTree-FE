import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {User} from '../_models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/admin/customers`);
  }


  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  registerEmployee(user: User) {
    return this.http.post(`${environment.apiUrl}/registerEmployee`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/customers/` + id);
  }
}
