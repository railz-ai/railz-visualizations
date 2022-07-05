import { Component, Input, OnInit } from '@angular/core';
import { RVConfiguration, RVReportTypes, RVOptions } from '@railzai/railz-visualizations';
import { cloneDeep } from 'lodash';

import { Filter } from '../../../types/form-submission';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.css'],
})
export class VisualizationsComponent implements OnInit {
  @Input() configuration: RVConfiguration;
  @Input() filter: Filter;
  @Input() options: RVOptions;

  allReportTypes = Object.values(RVReportTypes);

  constructor() {}

  ngOnInit(): void {}

  getNewFilter = (filter: Filter, reportType: any): Filter => <Filter>{ ...filter, reportType };

  getNewOptions = (options: RVOptions, elementIndex: number): RVOptions => {
    const cloneOptions = cloneDeep(options);
    if (elementIndex !== 0) {
      delete cloneOptions?.title?.text;
    }
    return cloneOptions;
  };
}
