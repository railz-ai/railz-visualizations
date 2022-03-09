import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api';
import { AuthenticationParameters } from '../../../types/authentication';
import { Filter } from '../../../types/form-submission';
import {
  RVAccountingProviders,
  RVReportFrequency,
  RVReportTypes,
} from '@railzai/railz-visualizations';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<Filter>();
  @Output() authEvent = new EventEmitter<string>();
  @Input() options?: string;

  authForm = new FormGroup({
    authUrl: new FormControl('', Validators.required),
  });

  filterForm = new FormGroup({
    serviceName: new FormControl(
      RVAccountingProviders.QUICKBOOKS,
      Validators.required
    ),
    businessName: new FormControl('', Validators.required),
    connectionId: new FormControl('', Validators.required),
    reportType: new FormControl(
      RVReportTypes.BALANCE_SHEET,
      Validators.required
    ),
    reportFrequency: new FormControl(
      RVReportFrequency.MONTH,
      Validators.required
    ),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  requiresNoFrequency = (type: string) =>
    [
      RVReportTypes.INVOICES,
      RVReportTypes.BILLS,
      RVReportTypes.BANK_ACCOUNT,
      RVReportTypes.CREDIT_SCORE,
    ].includes(type as RVReportTypes);
  requiresNoDate = (type: string) =>
    [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(
      type as RVReportTypes
    );

  token: string = '';

  constructor(private apiService: ApiService) {
    this.checkValueChanges();
  }

  ngOnInit(): void {}

  checkValueChanges(): void {
    this.filterForm
      ?.get('businessName')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((val) => {
        if (this.filterForm) {
          if (val) {
            this.filterForm.controls['connectionId'].clearValidators();
            this.filterForm.controls['connectionId'].disable();
          } else {
            this.filterForm.controls['connectionId'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['connectionId'].enable();
          }
          this.filterForm.controls['connectionId'].updateValueAndValidity();
        }
      });
    this.filterForm
      ?.get('connectionId')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((val) => {
        if (this.filterForm) {
          if (val) {
            this.filterForm.controls['businessName'].clearValidators();
            this.filterForm.controls['businessName'].disable();
            this.filterForm.controls['serviceName'].clearValidators();
            this.filterForm.controls['serviceName'].disable();
          } else {
            this.filterForm.controls['businessName'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['businessName'].enable();
            this.filterForm.controls['serviceName'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['serviceName'].enable();
          }
          this.filterForm.controls['businessName'].updateValueAndValidity();
          this.filterForm.controls['serviceName'].updateValueAndValidity();
        }
      });
    this.filterForm
      ?.get('reportType')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((val) => {
        if (this.filterForm) {
          if (val) {
            if (this.requiresNoDate(val)) {
              this.filterForm.controls['startDate'].clearValidators();
              this.filterForm.controls['startDate'].disable();
              this.filterForm.controls['endDate'].clearValidators();
              this.filterForm.controls['endDate'].disable();
            } else {
              this.filterForm.controls['startDate'].setValidators([
                Validators.required,
              ]);
              this.filterForm.controls['startDate'].enable();
              this.filterForm.controls['endDate'].setValidators([
                Validators.required,
              ]);
              this.filterForm.controls['endDate'].enable();
            }
            if (this.requiresNoFrequency(val)) {
              this.filterForm.controls['reportFrequency'].clearValidators();
              this.filterForm.controls['reportFrequency'].disable();
            } else {
              this.filterForm.controls['reportFrequency'].setValidators([
                Validators.required,
              ]);
              this.filterForm.controls['reportFrequency'].enable();
            }
          } else {
            this.filterForm.controls['startDate'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['startDate'].enable();
            this.filterForm.controls['endDate'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['endDate'].enable();
            this.filterForm.controls['reportFrequency'].setValidators([
              Validators.required,
            ]);
            this.filterForm.controls['reportFrequency'].enable();
          }
          this.filterForm.controls['startDate'].updateValueAndValidity();
          this.filterForm.controls['endDate'].updateValueAndValidity();
          this.filterForm.controls['reportFrequency'].updateValueAndValidity();
        }
      });
  }

  authorize = (config: AuthenticationParameters) => {
    this.apiService.getAccessToken(config).subscribe((data: any) => {
      this.token = data.access_token;
      this.authEvent.emit(this.token);
    });
  };

  onFilterSubmit() {
    if (this.filterForm && this.filterForm.valid) {
      this.filterEvent.emit(this.filterForm.value);
    }
  }

  onAuthSubmit() {
    if (this.authForm && this.authForm.valid) {
      this.authorize(this.authForm.value);
    }
  }
}
