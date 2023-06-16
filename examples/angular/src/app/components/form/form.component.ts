import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {
  RVAccountingProviders,
  RVOptions,
  RVReportFrequency,
  RVReportTypes,
} from '@railzai/railz-visualizations';

import { distinctUntilChanged } from 'rxjs';

import { ApiService } from '../../../services/api';
import { AuthenticationParameters } from '../../../types/authentication';
import { Filter } from '../../../types/form-submission';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<Filter>();
  @Output() authEvent = new EventEmitter<string>();
  @Output() optionEvent = new EventEmitter<RVOptions>();
  @Input() options?: RVOptions;

  authForm = new FormGroup({
    authUrl: new FormControl('http://localhost:4000/authenticate', Validators.required),
  });

  filterForm = new FormGroup({
    serviceName: new FormControl(RVAccountingProviders.QUICKBOOKS, Validators.required),
    businessName: new FormControl('', Validators.required),
    connectionId: new FormControl('', Validators.required),
    reportType: new FormControl(RVReportTypes.BALANCE_SHEET, Validators.required),
    reportFrequency: new FormControl(RVReportFrequency.MONTH, Validators.required),
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

  requiresNoEndDate = (type: RVReportTypes) => [RVReportTypes.BANK_ACCOUNT].includes(type);

  optionalEndDate = (type: RVReportTypes) =>
    [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(type);

  requiresNoStartDate = (type: RVReportTypes) =>
    [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(type);

  token = '';

  constructor(private apiService: ApiService) {
    this.checkValueChanges();
  }

  ngOnInit(): void {}

  checkValueChanges(): void {
    this.filterForm
      ?.get('businessName')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((val: string) => {
        if (this.filterForm) {
          if (val) {
            this.filterForm.controls['connectionId'].clearValidators();
            this.filterForm.controls['connectionId'].disable();
          } else {
            this.filterForm.controls['connectionId'].setValidators([Validators.required]);
            this.filterForm.controls['connectionId'].enable();
          }
          this.filterForm.controls['connectionId'].updateValueAndValidity();
        }
      });
    this.filterForm
      ?.get('connectionId')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((val: string) => {
        if (this.filterForm) {
          if (val) {
            this.filterForm.controls['businessName'].clearValidators();
            this.filterForm.controls['businessName'].disable();
            this.filterForm.controls['serviceName'].clearValidators();
            this.filterForm.controls['serviceName'].disable();
          } else {
            this.filterForm.controls['businessName'].setValidators([Validators.required]);
            this.filterForm.controls['businessName'].enable();
            this.filterForm.controls['serviceName'].setValidators([Validators.required]);
            this.filterForm.controls['serviceName'].enable();
          }
          this.filterForm.controls['businessName'].updateValueAndValidity();
          this.filterForm.controls['serviceName'].updateValueAndValidity();
        }
      });
    this.filterForm
      ?.get('reportType')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((reportTypeValue: RVReportTypes) => {
        if (this.filterForm) {
          if (reportTypeValue) {
            if (this.requiresNoStartDate(reportTypeValue)) {
              this.filterForm.controls['startDate'].clearValidators();
              this.filterForm.controls['startDate'].disable();
            } else {
              this.filterForm.controls['startDate'].setValidators([Validators.required]);
              this.filterForm.controls['startDate'].enable();
            }
            if (this.requiresNoEndDate(reportTypeValue)) {
              this.filterForm.controls['endDate'].clearValidators();
              this.filterForm.controls['endDate'].disable();
            } else {
              console.log('its not optional', !this.optionalEndDate(reportTypeValue));

              this.filterForm.controls['endDate'].setValidators(
                this.optionalEndDate(reportTypeValue) ? [] : [Validators.required],
              );
              this.filterForm.controls['endDate'].enable();
            }
            if (this.requiresNoFrequency(reportTypeValue)) {
              this.filterForm.controls['reportFrequency'].clearValidators();
              this.filterForm.controls['reportFrequency'].disable();
            } else {
              this.filterForm.controls['reportFrequency'].setValidators([Validators.required]);
              this.filterForm.controls['reportFrequency'].enable();
            }
          } else {
            this.filterForm.controls['startDate'].setValidators([Validators.required]);
            this.filterForm.controls['startDate'].enable();
            this.filterForm.controls['endDate'].setValidators([Validators.required]);
            this.filterForm.controls['endDate'].enable();
            this.filterForm.controls['reportFrequency'].setValidators([Validators.required]);
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

  onOptionsSubmit(options: RVOptions) {
    if (options) {
      this.optionEvent.emit(options);
    }
  }

  onAuthSubmit() {
    if (this.authForm && this.authForm.valid) {
      this.authorize(this.authForm.value);
    }
  }
}
