import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Filter } from '../../../types/form-submission';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
})
export class BasicComponent implements OnInit {
  // @ts-ignore
  token: { token: string; endpoint: string };
  filter: Filter;

  constructor(private ref: ChangeDetectorRef) {}

  onTokenSubmit = (token: string) => {
    this.token = { token: token, endpoint: 'http://localhost:3001' };
    this.ref.detectChanges();
  };

  onFilterSubmit = (filter: Filter) => {
    this.filter = filter;
  };

  ngOnInit(): void {}
}
