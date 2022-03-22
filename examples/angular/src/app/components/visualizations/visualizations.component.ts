import { Component, Input, OnInit } from '@angular/core';

import { RVReportTypes, RVOptions } from '@railzai/railz-visualizations';

import { Filter } from '../../../types/form-submission';

@Component({
  selector: 'app-visualizations',
  templateUrl: './visualizations.component.html',
  styleUrls: ['./visualizations.component.css'],
})
export class VisualizationsComponent implements OnInit {
  @Input() token: { token: string };
  @Input() filter: Filter;
  @Input() options: RVOptions;

  allReportTypes = Object.values(RVReportTypes);

  constructor() {}

  ngOnInit(): void {}

  getNewFilter = (filter: Filter, reportType: any): Filter => <Filter>{ ...filter, reportType };
}
