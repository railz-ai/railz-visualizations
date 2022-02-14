import { Component } from '@angular/core';
import {RVAccountingProviders} from "@railzai/railz-visualizations/src";
import {RVReportFrequency, RVReportTypes} from "@railzai/railz-visualizations";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../services/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // @ts-ignore
  token: { token: string; };
  filter = {
    businessName: "testFreshbooks",
    serviceName: RVAccountingProviders.FRESHBOOKS,
    reportType: RVReportTypes.BILLS,
    startDate: "2021-01-01",
    endDate: "2022-01-28"
  }

  constructor(private apiService: ApiService) {
  }

  authorize = () => {
    this.apiService.getAccessToken('null', 'null', 'null').subscribe((data: any) => {
      this.token = {token: data.access_token};
    });
  }
}
