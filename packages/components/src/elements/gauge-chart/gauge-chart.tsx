/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';
import { format, parseISO } from 'date-fns';
import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more.js';
import solidGauge from 'highcharts/modules/solid-gauge.js';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import {
  getConfiguration,
  getDateFilter,
  validateRequiredParams,
  getOptions,
} from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';
import Translations from '../../config/translations/en.json';
import {
  RVConfiguration,
  RVFilterAll,
  RVFilterGauge,
  RVFormattedGaugeResponse,
  RVGaugeChartSummary,
  RVOptions,
} from '../../types';
import { errorLog } from '../../services/logger';

import { getOptionsGauge, getReportData } from './gauge-chart.utils';

highchartsMore(Highcharts);
solidGauge(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-gauge-chart',
  styleUrl: 'gauge-chart.scss',
  shadow: true,
})
export class GaugeChart {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterGauge;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterGauge;
  @State() private _options: RVOptions;
  @State() private error: string;
  @State() private errorStatusCode: number;
  @State() private lastUpdated: string;
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
    filter: RVFilterGauge,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getDateFilter(filter) as RVFilterGauge;
        this._options = getOptions(options, filter as RVFilterAll);
        const valid = validateRequiredParams(filter as RVFilterAll);
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

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterGauge, oldValue: RVFilterGauge): Promise<void> {
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
      })) as RVFormattedGaugeResponse;

      if (reportData?.data) {
        this.lastUpdated = reportData.data.lastUpdated;
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
  private updateHighchartsParams = (gauge: RVGaugeChartSummary): void => {
    const options = getOptionsGauge(gauge);
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
        class="railz-gauge-chart-container"
        id="railz-gauge-chart"
        ref={(el): HTMLDivElement => (this.containerRef = el)}
      />
    );
  };

  render(): HTMLElement {
    return (
      <div class="railz-container" style={this._options?.container?.style}>
        {this._options?.title ? (
          <p class="railz-title" style={this._options?.title?.style}>
            {this._options?.title?.text || ''}{' '}
            <railz-tooltip
              tooltipStyle={{ position: 'bottom-center' }}
              tooltipText={Translations.RV_TOOLTIP_RAILZ_SCORE}
            />
          </p>
        ) : null}
        {this.renderMain()}
        {this.lastUpdated && (
          <p class="railz-gauge-last-updated">
            {Translations.RV_AS_OF} {format(parseISO(this.lastUpdated), 'dd MMM yyyy')}
          </p>
        )}
      </div>
    );
  }
}
