import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Filter} from "../../../types/form-submission";
import {RVReportTypes} from "@railzai/railz-visualizations";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  // @ts-ignore
  token: { token: string; };
  filter: Filter;
  allReportTypes = Object.values(RVReportTypes);

  constructor(private ref: ChangeDetectorRef) {
  }

  getNewFilter = (filter: Filter, reportType: any): Filter => <Filter>({...filter, reportType})

  onTokenSubmit = (token: string) => {
    this.token = {token: token};
    this.ref.detectChanges();
  }

  onFilterSubmit = (filter: Filter) => {
    console.log(filter);
    this.filter = filter;
  }

  ngOnInit(): void {
  }
}
