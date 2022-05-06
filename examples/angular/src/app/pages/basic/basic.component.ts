import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Filter } from '../../../types/form-submission';
import { RVConfiguration } from '@railzai/railz-visualizations';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  // @ts-ignore
  configuration: RVConfiguration;
  filter: Filter;

  constructor(private ref: ChangeDetectorRef) {}

  onTokenSubmit = (token: string) => {
    this.configuration = { token: token, debug: true, endpoint: 'https://api.qa2.railz.ai' };
    this.ref.detectChanges();
  };

  onFilterSubmit = (filter: Filter) => {
    this.filter = filter;
  };

  ngOnInit(): void {}
}
