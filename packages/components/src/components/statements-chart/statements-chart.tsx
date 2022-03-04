/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';

import {
  RVBaseStatementsFilter,
  RVConfiguration,
  RVFilterFrequency,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions,
} from "../../types";

import { RVFinancialStatementsTypes } from '../../types/enum/report-type';
import { getConfiguration, getDateFilter, getHighchartsParams, getOptions } from '../../helpers/chart.utils';

import { formatData, getReportData } from './statements-chart.utils';

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-statements-chart',
  styleUrl: './statements-chart.scss',
  shadow: true,
})
export class StatementsChart {
  @Prop() readonly configuration!: RVConfiguration;
  @Prop() readonly filter!: RVBaseStatementsFilter;
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVBaseStatementsFilter;
  @State() private _options: RVOptions;
  @State() private _dataFormatted: RVFormattedStatementData;
  @State() private error: string;
  @State() private errorStatusCode: number;

  @State() private chartOptions: any;

  @State() private containerRef?: HTMLDivElement;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (configuration: RVConfiguration, filter: RVFilterFrequency, triggerRequest: boolean = true): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      this._filter = getDateFilter(filter) as RVFilterFrequency;
      this._options = getOptions(this.options, this._filter);
      if(triggerRequest) {
        await this.requestReportData();
      }
    }
  };

  @Watch('containerRef')
  validateContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    if (newValue && this.chartOptions) {
      Highcharts.chart(this.containerRef, this.chartOptions);
    }
  }

  @Watch('filter')
  async validateFilter(newValue: RVFilterFrequency, oldValue: RVFilterFrequency): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue);
    }
  }

  @Watch('configuration')
  async validateConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter);
    }
  }

  private propsUpdated = async (triggerRequest: boolean = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, triggerRequest);
  };

  /**
   * Request report data based on filter and configuration
   * formats retrieved data into Highcharts format
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    const reportData = (await getReportData({
      filter: this._filter,
      configuration: this._configuration,
    })) as RVFormattedStatementResponse;
    try {
      if (reportData?.data) {
        this._dataFormatted = formatData({
          summary: reportData.data,
          reportType: this._filter.reportType as RVFinancialStatementsTypes,
          reportFrequency: this._filter?.reportFrequency,
          colors: this._options?.chart?.colors,
        });
        this.updateHighchartsParams();
      } else if (reportData?.error) {
        this.error = Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA;
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        this.error = Translations.ERROR_202_TITLE;
        this.errorStatusCode = reportData?.status;
      }
    } catch (error) {
      errorLog(Translations.NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  private updateHighchartsParams = (): void => {
    const options = getHighchartsParams({ dataFormatted: this._dataFormatted, options: this._options });
    if (options) {
      this.error = '';
      this.loading = '';
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated(false);
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error)) {
      return <railz-error-image statusCode={this.errorStatusCode || 500} />;
    }
    if (!isEmpty(this.loading)) {
      return <railz-loading loadingText={this.loading} />;
    }
    return <div class="railz-statement-chart-container" id="railz-chart" ref={(el): HTMLDivElement => (this.containerRef = el)} />;
  };

  render(): HTMLElement {
    return (
      <div class="railz-container" style={this._options?.container?.style}>
        {this._options?.title ? (
          <p class="railz-title" style={this._options?.title?.style}>
            {this._options?.title?.text || ''}
          </p>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
