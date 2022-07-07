import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { RVReportTypes, RVOptions, RVConfiguration } from '@railzai/railz-visualizations';

import { Filter } from '../../../types/form-submission';
import { INITIAL_OPTIONS } from '../../../types/constants';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css'],
})
export class CustomizationComponent implements OnInit {
  // @ts-ignore
  configuration: RVConfiguration;
  filter: Filter;
  options: RVOptions = INITIAL_OPTIONS;
  allReportTypes = Object.values(RVReportTypes);

  constructor(private ref: ChangeDetectorRef) {}

  getNewFilter = (filter: Filter, reportType: any): Filter => <Filter>{ ...filter, reportType };

  onTokenSubmit = (token: string) => {
    this.configuration = { token: token, debug: true };
    this.ref.detectChanges();
  };

  onFilterSubmit = (filter: Filter) => {
    this.filter = filter;
  };

  onOptionsChange = (options: RVOptions) => {
    this.options = options;
  };

  get jsonOptions() {
    return INITIAL_OPTIONS;
  }

  ngOnInit(): void {}
}
