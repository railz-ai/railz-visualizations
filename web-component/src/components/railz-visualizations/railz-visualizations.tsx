import { Component, Prop, h, State } from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import { compareAsc, parseISO } from 'date-fns';

import { LoggerServiceInstance } from '../../services/logger';
import { RequestServiceInstance } from '../../services/request';

import { ErrorImage } from './error/error-image';
import { Loading } from './loading/loading';
import { Alert } from './alert/alert';
import { ProgressBar } from './progress-bar/progress-bar';
import Translations from './assets/en.json';
import { formatBarChartData, getOptionsBarChart, getTitleByReportType, isBarChart, isProgressBar } from './utils/utils';
import { RailzVisualizationsConfiguration, RailzVisualizationsData, RailzVisualizationsFilter, RailzVisualizationsOptions } from './types';

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-visualizations',
  styleUrl: 'railz-visualizations.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class RailzVisualizations {
  @Prop() configuration!: RailzVisualizationsConfiguration | string;
  @Prop() filter!: RailzVisualizationsFilter | string;
  @Prop() options: RailzVisualizationsOptions | string;

  @State()
  private loading: string = '';
  @State()
  private _configuration: RailzVisualizationsConfiguration;
  @State()
  private _filter: RailzVisualizationsFilter;
  @State()
  private _options: RailzVisualizationsOptions;
  @State()
  private _dataFormatted: RailzVisualizationsData;
  @State()
  private error: string;
  @State()
  private errorStatusCode: number;
  @State()
  private alert: string;
  private containerRef?: HTMLDivElement;

  propsUpdated = () => {
    this.updateConfiguration();
    this.updateOptions();
    this.updateFilter();
    this.requestReportData();
  };

  requestReportData = async () => {
    this.loading = Translations.FETCHING_REPORT;
    let reportData;
    try {
      reportData = await RequestServiceInstance.getReportData({
        token: this._configuration.token,
        reportType: this._filter.reportType,
        startDate: this._filter.startDate,
        endDate: this._filter.endDate,
        businessName: this._filter.businessName,
        // connectionId: this._filter.connectionId,
        reportFrequency: this._filter.reportFrequency,
        serviceName: this._filter.serviceName,
      });
    } catch (error) {
      this.error = this.error || `${Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA} (${error})`;
    }

    this.loading = Translations.PARSING_REPORT;
    try {
      if (reportData?.data) {
        if (isBarChart(this._filter?.reportType)) {
          this._dataFormatted = formatBarChartData({ summary: reportData.data, reportFrequency: this._filter?.reportFrequency, colors: this._options?.chart?.colors });
          this.updateHighchartsParams();
        }
        if (isProgressBar(this._filter?.reportType)) {
          this._dataFormatted = reportData.data;
        }
      } else if (reportData?.error) {
        this.error = this.error || `${Translations.NOT_ABLE_TO_RETRIEVE_REPORT_DATA} (${reportData.error?.statusCode}) ${reportData.error?.message?.[0]} `;
        this.errorStatusCode = reportData.error?.statusCode;
      } else {
        this.error = this.error || Translations.ERROR_204;
        this.errorStatusCode = reportData?.status;
      }
    } catch (error) {
      this.error = this.error || `${Translations.NOT_ABLE_TO_PARSE_REPORT_DATA} (${error})`;
    } finally {
      this.loading = '';
    }
  };

  updateConfiguration = () => {
    LoggerServiceInstance.log(Translations.CONFIGURATION, this.configuration);
    if (this.configuration) {
      if (typeof this.configuration === 'string') {
        try {
          LoggerServiceInstance.log(Translations.CONFIGURATION_PARSE_START);
          const parsedConfiguration = JSON.parse(this.configuration);
          this._configuration = parsedConfiguration;
          LoggerServiceInstance.log(Translations.CONFIGURATION_PARSE_END);
        } catch (error) {
          this.error = this.error || Translations.ERROR_PARSING_CONFIGURATION + ' ' + JSON.stringify(error);
        }
      } else {
        LoggerServiceInstance.log(Translations.CONFIGURATION_OBJECT);
        this._configuration = this.configuration;
      }
      LoggerServiceInstance.debug = this._configuration?.debug;
      if (!this._configuration?.token) {
        this.error = this.error || Translations.TOKEN_NOT_PRESENT;
        return;
      }
    } else {
      this.error = this.error || Translations.CONFIGURATION_NOT_PRESENT;
    }
  };

  updateFilter = () => {
    LoggerServiceInstance.log(Translations.FILTER, this.filter);
    if (this.filter) {
      if (typeof this.filter === 'string') {
        try {
          LoggerServiceInstance.log(Translations.FILTER_PARSE_START);
          const parsedFilter = JSON.parse(this.filter);
          this._filter = parsedFilter;
          LoggerServiceInstance.log(Translations.FILTER_PARSE_END);
        } catch (error) {
          this.error = this.error || Translations.ERROR_PARSING_FILTER + JSON.stringify(error);
        }
      } else {
        LoggerServiceInstance.log('filter as Object');
        this._filter = this.filter;
      }
      const compare = compareAsc(parseISO(this._filter.startDate), parseISO(this._filter.endDate));
      if (compare >= 0) {
        this.error = this.error || Translations.END_DATE_BEFORE_START_DATE;
        return;
      }
    } else {
      this.error = this.error || Translations.FILTER_NOT_PRESENT;
    }
  };

  updateOptions = () => {
    LoggerServiceInstance.log(Translations.OPTIONS, this.options);
    if (this.options) {
      if (typeof this.options === 'string') {
        try {
          LoggerServiceInstance.log(Translations.OPTIONS + Translations.PARSE_START);
          const parsedOptions = JSON.parse(this.options);
          this._options = parsedOptions;
          LoggerServiceInstance.log(Translations.OPTIONS + Translations.PARSE_END);
        } catch (error) {
          this.error = this.error || Translations.ERROR_PARSING + Translations.OPTIONS + JSON.stringify(error);
        }
      } else {
        LoggerServiceInstance.log(Translations.OPTIONS + ' as Object');
        this._options = this.options;
      }
    } else {
      this.error = this.error || Translations.OPTIONS + Translations.NOT_PRESENT;
    }
  };

  updateHighchartsParams = () => {
    let options;
    try {
      if (isBarChart(this._filter?.reportType)) {
        options = getOptionsBarChart({
          categories: this._dataFormatted?.categories,
          series: this._dataFormatted?.series,
          chart: this._options?.chart,
        });
      }
    } catch (error) {
      this.error = this.error || Translations.NOT_ABLE_TO_PARSE_REPORT_DATA + JSON.stringify(error);
    }

    if (options) {
      try {
        if (this.containerRef) Highcharts.chart(this.containerRef, options);
      } catch (error) {
        this.error = this.error || Translations.NOT_ABLE_TO_LOAD_HIGHCHARTS + JSON.stringify(error);
      }
    }
  };

  componentWillLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  render() {
    return (
      <div class="global-div" style={this._options?.container?.style}>
        <h4 class="title" style={this._options?.title?.style}>
          {this._options?.title?.text ? this._options?.title?.text : getTitleByReportType(this._filter?.reportType)}
        </h4>
        {this.renderMain()}
      </div>
    );
  }

  renderMain() {
    if (this.error) {
      return <ErrorImage error={this._configuration?.debug && this.error} statusCode={this.errorStatusCode} />;
    }
    if (this.loading) {
      return <Loading loading={this.loading} />;
    }
    if (this.alert) {
      return <Alert alert={this.alert} />;
    }
    if (isBarChart(this._filter?.reportType)) {
      return <div ref={el => (this.containerRef = el)} />;
    }
    if (isProgressBar(this._filter?.reportType)) {
      return (
        <ProgressBar
          reportType={this._filter?.reportType}
          unpaidAmount={this._dataFormatted.unpaidAmount}
          paidAmount={this._dataFormatted.paidAmount}
          overdueAmount={this._dataFormatted.overdueAmount}
        />
      );
    }
    return <ErrorImage error={this._configuration?.debug && this.error} statusCode={this.errorStatusCode} />;
  }
}
