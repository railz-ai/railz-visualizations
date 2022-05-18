/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import Highcharts from 'highcharts';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';

import {
  RVConfiguration,
  RVFilterAll,
  RVFilterStatements,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions,
} from '../../types';

import { RVFinancialStatementsTypes } from '../../types/enum/report-type';
import {
  getConfiguration,
  getDateFilter,
  getHighchartsParams,
  getOptions,
  validateRequiredParams,
} from '../../helpers/chart.utils';

import { ConfigurationInstance } from '../../services/configuration';

import { formatData, getReportData } from './statements-chart.utils';

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
  @Prop() readonly filter!: RVFilterStatements;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterStatements;
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
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterStatements,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getDateFilter(filter) as RVFilterStatements;
        this._options = getOptions(this.options, this._filter as RVFilterAll);
        const valid = validateRequiredParams(this._filter as RVFilterAll);
        if (valid) {
          if (triggerRequest) {
            await this.requestReportData();
          }
        } else {
          this.errorStatusCode = 204;
          this.error = Translations.ERROR_204_TITLE;
        }
      } catch (e) {
        this.errorStatusCode = 500;
        this.error = e;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 500;
      this.error = Translations.RV_CONFIGURATION_NOT_PRESENT;
    }
  };

  @Watch('containerRef')
  watchContainerRef(newValue: HTMLDivElement, _: HTMLDivElement): void {
    if (newValue && this.chartOptions) {
      Highcharts.chart(this.containerRef, this.chartOptions);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterStatements, oldValue: RVFilterStatements): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue);
    }
  }

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter);
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, triggerRequest);
  };

  /**
   * Request report data based on filter and configuration param
   * Formats retrieved data into Highcharts format using formatData
   * Updated Highchart params using updateHighchartsParams
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVFormattedStatementResponse;
      if (reportData?.data) {
        this._dataFormatted = formatData({
          summary: reportData.data,
          reportType: this._filter?.reportType as RVFinancialStatementsTypes,
          reportFrequency: this._filter?.reportFrequency,
          chart: this._options?.chart,
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
      this.error = '';
      this.loading = '';
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error)) {
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
      <div class="rv-container" style={this._options?.container?.style}>
        {this._options?.title ? (
          <p class="rv-title" style={this._options?.title?.style}>
            {this._options?.title?.text || ''}
          </p>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
