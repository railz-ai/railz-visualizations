/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual, isNil } from 'lodash-es';
import Highcharts from 'highcharts';
import variablePie from 'highcharts/modules/variable-pie.js';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { getConfiguration, getOptions, getFilter } from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import Translations from '../../config/translations/en.json';
import {
  RVConfiguration,
  RVFormattedPieResponse,
  RVOptions,
  RVPieChartSummary,
  RVRevenueExpensesSummary,
  RVReportTypes,
  RVFilterPie,
  RVFilterAll,
} from '../../types';
import { errorLog } from '../../services/logger';

import { isPie, roundNumber } from '../../helpers/utils';

import { getOptionsPie, getReportData } from './pie-chart.utils';

variablePie(Highcharts);
highchartsAccessibility(Highcharts);

const TranslationMapping = {
  [RVReportTypes.EXPENSES]: 'EXPENSES',
  [RVReportTypes.REVENUE]: 'REVENUES',
};

@Component({
  tag: 'railz-pie-chart',
  styleUrl: 'pie-chart.scss',
  shadow: true,
})
export class PieChart {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterPie;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterPie;
  @State() private _options: RVOptions;
  @State() private _summary: RVRevenueExpensesSummary;
  @State() private error: string;
  @State() private errorStatusCode: number;
  @State() private chartOptions: any;
  @State() private containerRef?: HTMLDivElement;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterPie,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterPie;
        if (this._filter) {
          if (isPie(this._filter.reportType)) {
            this._options = getOptions(options, filter as RVFilterAll);
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

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterPie, oldValue: RVFilterPie): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(this.configuration, newValue, this.options);
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
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVFormattedPieResponse;

      if (reportData?.data) {
        this._summary = reportData?.data as RVRevenueExpensesSummary;
        this.updateHighchartsParams(reportData.data);
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
  private updateHighchartsParams = (summary: RVPieChartSummary): void => {
    const chartOptions = getOptionsPie(summary, this._options);
    if (chartOptions) {
      this.error = '';
      this.loading = '';
      this.chartOptions = chartOptions;
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain = (): HTMLElement => {
    if (!isEmpty(this.error) || this.errorStatusCode !== undefined) {
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
      <div class="railz-pie-chart-container">
        <div
          id="railz-pie-chart"
          ref={(el): HTMLDivElement => (this.containerRef = el)}
          style={{ width: this._options?.chart?.width, height: this._options?.chart?.height }}
        />
        <div class="railz-pie-chart-box">
          {!isNil(this._summary?.percentageChange) && (
            <div class="railz-pie-chart-percentage">
              {this._summary?.percentageChange >= 0 ? (
                <div class="positive">&#x25B2; {this._summary?.percentageChange}%</div>
              ) : (
                <div class="negative">&#x25BC; {this._summary?.percentageChange}%</div>
              )}
            </div>
          )}
          <p class="railz-pie-chart-text">${roundNumber(this._summary?.totalAmount)}</p>
        </div>
      </div>
    );
  };

  render(): HTMLElement {
    return (
      <div class="rv-container" style={this._options?.container?.style}>
        {this._options?.title ? (
          <div>
            <p class="rv-title" style={this._options?.title?.style}>
              {this._options?.title?.text || ''}{' '}
              {this._options?.container?.tooltip ? (
                <railz-tooltip
                  tooltipText={
                    Translations[`RV_TOOLTIP_${TranslationMapping[this._filter?.reportType]}`]
                  }
                />
              ) : null}
            </p>
          </div>
        ) : null}
        {this.renderMain()}
      </div>
    );
  }
}
