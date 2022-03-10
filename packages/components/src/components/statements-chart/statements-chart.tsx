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
  RVConfiguration,
  RVFilterFrequency,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions,
  RVContent,
} from '../../types';

import { RVFinancialStatementsTypes } from '../../types/enum/report-type';
import {
  getConfiguration,
  getDateFilter,
  getHighchartsParams,
  getOptions,
  getContent,
  validateRequiredParams,
} from '../../helpers/chart.utils';

import { ConfigurationInstance } from '../../services/configuration';

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
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterFrequency;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;
  /**
   * Content text/info
   */
  @Prop() readonly content?: RVContent;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterFrequency;
  @State() private _options: RVOptions;
  @State() private _content: RVContent;
  @State() private _dataFormatted: RVFormattedStatementData;
  @State() private errorStatusCode = 0;

  @State() private chartOptions: any;

  @State() private containerRef?: HTMLDivElement;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param content - content to text that should display
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterFrequency,
    options: RVOptions,
    content: RVContent,
    triggerRequest = true,
  ): Promise<void> => {
    this.errorStatusCode = 0;
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getDateFilter(filter) as RVFilterFrequency;
        this._options = getOptions(options, filter);
        this._content = getContent(content);

        const valid = validateRequiredParams(this._filter);
        if (valid) {
          if (triggerRequest) {
            await this.requestReportData();
          }
        } else {
          this.errorStatusCode = 204;
        }
      } catch (e) {
        this.errorStatusCode = 500;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 500;
      errorLog(Translations.RV_CONFIGURATION_NOT_PRESENT);
    }
  };

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    if (newValue && this.chartOptions) {
      Highcharts.chart(this.containerRef, this.chartOptions);
    }
  }

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options, this.content);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterFrequency, oldValue: RVFilterFrequency): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue, this.options, this.content);
    }
  }

  @Watch('options')
  async watchOptions(newValue: RVOptions, oldValue: RVOptions): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, this.filter, newValue, this.content);
    }
  }

  @Watch('content')
  async watchContent(newValue: RVContent, oldValue: RVContent): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, this.filter, this.options, newValue);
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(
      this.configuration,
      this.filter,
      this.options,
      this.content,
      triggerRequest,
    );
  };

  /**
   * Request report data based on filter and configuration param
   * Formats retrieved data into Highcharts format using formatData
   * Updated Highchart params using updateHighchartsParams
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = 0;
    console.log('statements-chart requestReportData');
    this.loading = Translations.LOADING_REPORT;
    try {
      console.log(1);
      const reportData = (await getReportData({
        filter: this._filter,
      })) as RVFormattedStatementResponse;
      console.log('1.a', reportData);
      if (reportData?.data) {
        console.log(2);
        this._dataFormatted = formatData({
          summary: reportData.data,
          reportType: this._filter?.reportType as RVFinancialStatementsTypes,
          reportFrequency: this._filter?.reportFrequency,
          chart: this._options?.chart,
        });
        console.log(3);
        console.log('statements-chart requestReportData this._dataFormatted', this._dataFormatted);
        this.updateHighchartsParams();
        console.log(4);
      } else if (reportData?.error) {
        console.log(5);
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        console.log(6, reportData?.status);
        this.errorStatusCode = reportData?.status;
      }
    } catch (error) {
      console.log(7);
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  /**
   * Using getHighchartsParams,Combine generic stacked bar line
   * chart options and formatted data based on the report type
   * into one option for highcharts
   */
  private updateHighchartsParams = (): void => {
    const options = getHighchartsParams({
      dataFormatted: this._dataFormatted,
      options: this._options,
    });
    if (options) {
      this.loading = '';
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    console.log('statements-chart this.errorStatusCode', this.errorStatusCode);
    if (this.errorStatusCode !== 0) {
      console.log('this.errorStatusCode', this.errorStatusCode);
      console.log('this._options?.errorIndicator', this._options?.errorIndicator);
      return (
        <railz-error-image
          statusCode={this.errorStatusCode || 500}
          {...this._options?.errorIndicator}
        />
      );
    }
    if (!isEmpty(this.loading)) {
      return <railz-loading loadingText={this.loading} {...this._options?.loadingIndicator} />;
    }
    return (
      <div
        class="railz-statement-chart-container"
        id="railz-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
      />
    );
  };

  render(): HTMLElement {
    return (
      <div class="railz-container" style={this._options?.container?.style}>
        {this._content?.title ? (
          <p class="railz-title" style={this._options?.title?.style}>
            {this._content?.title || ''}
          </p>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
