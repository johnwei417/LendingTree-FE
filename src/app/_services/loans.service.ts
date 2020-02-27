import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Loan } from '../_models';

@Injectable() 
export class LoanService{

    constructor(private http: HttpClient) { }
    getAll() {
        return this.http.get<Loan[]>(`${environment.apiUrl}/admin/loanviewer`);
    }

}