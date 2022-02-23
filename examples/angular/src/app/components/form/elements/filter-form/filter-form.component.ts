import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  RVAccountingProviders,
  RVBankingProviders, RVReportFrequency,
  RVReportTypes,
  RVSandboxProviders
} from "../../../../../../../../packages/components";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html'
})
export class FilterFormComponent implements OnInit {

  arrayServiceProviders = [...Object.values(RVSandboxProviders), ...Object.values(RVBankingProviders), ...Object.values(RVAccountingProviders)];
  arrayAllReportTypes = ['all', ...Object.values(RVReportTypes)];
  arrayReportFrequency = Object.values(RVReportFrequency);

  @Input() filterForm: FormGroup = new FormGroup({});
  @Output() filterEvent = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.filterForm && this.filterForm.valid) {
      this.filterEvent.emit();
    }
  }

}
