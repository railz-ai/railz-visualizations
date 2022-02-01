import { Component, Prop, h, State } from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';

import { compareAsc, parseISO } from 'date-fns';
import { RailzVisualizationsConfiguration, RailzVisualizationsFilter, RailzVisualizationsOptions } from './types';
import { Error } from '../error/error';
import { Loading } from '../loading/loading';
import { Alert } from '../alert/alert';
import Translations from '../../assets/en.json';
import { formatBalanceSheet, getOptions } from '../../utils/utils';
import { LoggerServiceInstance } from '../../services/logger';
import { RequestServiceInstance } from '../../services/request';

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-visualizations',
  styleUrl: 'railz-visualizations.css',
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
  private _balanceSheetFormatted;
  @State()
  private error: string;
  @State()
  private alert: string;
  private containerRef?: HTMLDivElement;

  propsUpdated = () => {
    this.updateConfiguration();
    this.updateFilter();
    this.requestBalanceSheet();
  };

  requestBalanceSheet = async () => {
    this.loading = Translations.FETCHING_REPORT;
    const balanceSheet = await RequestServiceInstance.getBalanceSheets({
      token: this._configuration.token,
      reportType: this._filter.reportType,
      startDate: this._filter.startDate,
      endDate: this._filter.endDate,
      businessName: this._filter.businessName,
      reportFrequency: this._filter.reportFrequency,
      serviceName: this._filter.serviceName,
    });

    this.loading = Translations.PARSING_REPORT;
    if (balanceSheet.data) {
      this._balanceSheetFormatted = formatBalanceSheet(balanceSheet.data, this._filter.reportFrequency);
      this.updateOptions();
    } else {
      this.error = this.error || `${Translations.NOT_ABLE_TO_RETRIEVE_BALANCESHEETS} (${balanceSheet.error?.statusCode}) ${balanceSheet.error?.message?.[0]} `;
    }
    this.loading = '';
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
    let options;
    try {
      options = getOptions(this._balanceSheetFormatted);
    } catch (error) {
      this.error = this.error || Translations.NOT_ABLE_TO_PARSE_BALANCESHEETS + JSON.stringify(error);
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
    if (this.error) {
      return <Error error={this.error} />;
    }
    if (this.loading) {
      return <Loading loading={this.loading} />;
    }
    if (this.alert) {
      return <Alert alert={this.alert} />;
    }
    return <div ref={el => (this.containerRef = el)} />;
  }
}
