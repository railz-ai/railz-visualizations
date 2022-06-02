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
  getFilter,
  getHighchartsParams,
  getOptions,
} from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import { isStatements } from '../../helpers/utils';

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
  @Prop() readonly options?: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterStatements;
  @State() private _options: RVOptions;
  @State() private _dataFormatted: RVFormattedStatementData;
  @State() private errorStatusCode: number;

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
    filter: RVFilterStatements,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterStatements;
        if (this._filter) {
          if (isStatements(this._filter.reportType)) {
            this._options = getOptions(options, this._filter as RVFilterAll);
            if (triggerRequest) {
              await this.requestReportData();
            }
          } else {
            this.errorStatusCode = 500;
            errorLog(Translations.RV_ERROR_INVALID_REPORT_TYPE);
          }
        } else {
          this.errorStatusCode = 204;
        }
      } catch (e) {
        this.errorStatusCode = 500;
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 0;
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
      await this.validateParams(this.configuration, newValue, this.options);
    }
  }

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('options')
  async watchOptions(newValue: RVOptions, oldValue: RVOptions): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, this.filter, newValue);
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, this.options, triggerRequest);
  };

  /**
   * Request report data based on filter and configuration param
   * Formats retrieved data into Highcharts format using formatData
   * Updated Highchart params using updateHighchartsParams
   */
  private requestReportData = async (): Promise<void> => {
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
          month: this._options?.content?.date.month,
          quarter: this._options?.content?.date.quarter,
        });
        this.updateHighchartsParams();
      } else if (reportData?.error) {
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
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
      this.loading = '';
      this.chartOptions = options;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (this.errorStatusCode !== undefined) {
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
        style={{ width: this._options?.chart?.width, height: this._options?.chart?.height }}
      />
    );
  };

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        {this._options?.title ? (
          <p class="rv-title" style={this._options?.title?.style}>
            {this._options?.title?.text || ''}{' '}
            {this._options?.content?.tooltip?.description ? (
              <railz-tooltip
                tooltipStyle={{ position: 'bottom-center' }}
                tooltipText={this._options?.content?.tooltip?.description}
              />
            ) : null}
          </p>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
