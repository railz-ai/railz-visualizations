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
  token: RVConfiguration;
  filter: Filter;

  constructor(private ref: ChangeDetectorRef) {}

  onTokenSubmit = (token: string) => {
    this.token = { token: token, debug: true };
    this.ref.detectChanges();
  };

  onFilterSubmit = (filter: Filter) => {
    this.filter = filter;
  };

  ngOnInit(): void {}
}
