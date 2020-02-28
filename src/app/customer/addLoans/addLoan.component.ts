import {Component, OnInit} from '@angular/core';
import {Bank, LoanType, User} from '../../_models';
import {AlertService, LoanService} from '../../_services';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({templateUrl: 'addLoan.component.html'})
export class AddLoanComponent implements OnInit {
  banks: Bank[];
  loanTypes: LoanType[];
  currentUser: User;
  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private loanService: LoanService, private formBuilder: FormBuilder,
              private router: Router, private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }

  get bankId() {
    return this.addForm.get('bankId');
  }

  get loanTypeId() {
    return this.addForm.get('loantypeId');
  }

  public ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      userId: this.currentUser.id,
      amount: ['', Validators.required],
      bankId: ['', Validators.required],
      loantypeId: ['', Validators.required]

    });

    this.getBanks();
    this.getLoanTypes();
  }

  changeBank(e) {
    this.bankId.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeType(e) {
    this.loanTypeId.setValue(e.target.value, {
      onlySelf: true
    });
  }

  getBanks() {
    this.loanService.getBanks().subscribe(data => this.banks = data['result']);
  }

  getLoanTypes() {
    this.loanService.getLoanTypes().subscribe(data => this.loanTypes = data['result']);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;
    this.loanService.addNewLoan(this.addForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Add New Loan successful', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }
}
