import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Loan } from '../../_models';
import { LoanService } from '../../_services'; 

import { AlertService, AuthenticationService } from '../../_services';


@Component({templateUrl: 'loans.component.html'})
export class LoanManageComponent implements OnInit{
    constructor(private loanService: LoanService) {

    }
    loans: Loan[];

    ngOnInit() {
        this.getLoans();
    }

    getLoans(){
        this.loanService.getAll().subscribe(data => this.loans = data['result'])
     }

}