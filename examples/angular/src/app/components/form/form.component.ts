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
    connectionUuid: new FormControl('', Validators.required),
    reportType: new FormControl(RVReportTypes.BALANCE_SHEET, Validators.required),
    reportFrequency: new FormControl(RVReportFrequency.MONTH, Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    industryCode: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
  });

  requiresNoFrequency = (type: string) =>
    [
      RVReportTypes.INVOICES,
      RVReportTypes.BILLS,
      RVReportTypes.BANK_ACCOUNT,
      RVReportTypes.CREDIT_SCORE,
      RVReportTypes.TAX_BENCHMARKING,
    ].includes(type as RVReportTypes);

  requiresNoEndDate = (type: RVReportTypes) => [RVReportTypes.BANK_ACCOUNT].includes(type);

  optionalEndDate = (type: RVReportTypes) =>
    [RVReportTypes.BANK_ACCOUNT, RVReportTypes.CREDIT_SCORE].includes(type);

  requiresNoStartDate = (type: RVReportTypes) =>
    [
      RVReportTypes.BANK_ACCOUNT,
      RVReportTypes.CREDIT_SCORE,
      RVReportTypes.TAX_BENCHMARKING,
    ].includes(type);

  token = '';

  constructor(private apiService: ApiService) {
    this.checkValueChanges();
  }

  ngOnInit(): void {}

  checkValueChanges(): void {
    this.filterForm.controls['connectionUuid'].setValidators([Validators.required]);
    this.filterForm.controls['connectionUuid'].enable();

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
            this.filterForm.controls['industryCode'].enable();
            this.filterForm.controls['region'].enable();
          }
          this.filterForm.controls['startDate'].updateValueAndValidity();
          this.filterForm.controls['endDate'].updateValueAndValidity();
          this.filterForm.controls['reportFrequency'].updateValueAndValidity();
          this.filterForm.controls['industryCode'].updateValueAndValidity();
          this.filterForm.controls['region'].updateValueAndValidity();
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
