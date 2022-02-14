import {Component, h, Prop, State, Watch} from '@stencil/core';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import indicators from 'highcharts/indicators/indicators';
import trendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import Translations from '../../config/translations/en.json';
import {errorLog} from '../../services/logger';

import {
  RVBillInvoiceSummary,
  RVConfiguration, RVFilterDate,
  RVFormattedTransactionResponse,
  RVOptions
} from '../../types';
import {getConfiguration, getFilter, getOptions} from "../../helpers/chart.utils";
import {getTransactionsData} from "./transactions-control.utils";

exporting(Highcharts);
indicators(Highcharts);
trendline(Highcharts);
highchartsAccessibility(Highcharts);

@Component({
  tag: 'railz-transactions-control',
  styleUrl: './transactions-control.scss',
  shadow: true,
})
export class TransactionsControl {
  @Prop() configuration!: RVConfiguration;
  @Prop() filter!: RVFilterDate;
  @Prop() options: RVOptions;

  @State()
  private loading: string = '';
  @State()
  private _configuration: RVConfiguration;
  @State()
  private _filter: RVFilterDate;
  @State()
  private _options: RVOptions;
  @State()
  private _dataFormatted: RVBillInvoiceSummary;
  @State()
  private error: string;
  @State()
  private errorStatusCode: number;

  validateParams = async (configuration: RVConfiguration, filter: RVFilterDate) => {
    this._configuration = getConfiguration(configuration);
    if(this._configuration){
      this._filter = getFilter(filter) as RVFilterDate;
      this._options = getOptions(this.options, this._filter);
      await this.requestReportData();
    }
  };

  @Watch('filter')
  async validateFilter(newValue: RVFilterDate, _: RVFilterDate) {
    console.log(newValue);
    console.log('newValue Transactions');
    await this.validateParams(this.configuration, newValue);
  }

  @Watch('configuration')
  async validateConfiguration(newValue: RVConfiguration, _: RVConfiguration) {
    console.log(newValue);
    console.log('newValue Transactions');
    await this.validateParams(newValue, this.filter);
  }

  propsUpdated = async () => {
    await this.validateParams(this.configuration, this.filter);
  };

  requestReportData = async () => {
    this.loading = Translations.LOADING_REPORT;
    let reportData = await getTransactionsData({filter: this._filter, configuration: this._configuration}) as RVFormattedTransactionResponse
    try {
      if (reportData?.data) {
        this._dataFormatted = reportData?.data;
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

  componentWillLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  componentDidLoad() {
    this.propsUpdated && this.propsUpdated();
  }

  renderMain() {
    if (this.error) {
      return <railz-error-image statusCode={this.errorStatusCode || 500}/>;
    }
    if (this.loading) {
      return <railz-loading loadingText={this.loading}/>;
    }
    return <railz-progress-bar
      reportType={this._filter?.reportType}
      unpaidAmount={this._dataFormatted.unpaidAmount}
      paidAmount={this._dataFormatted.paidAmount}
      overdueAmount={this._dataFormatted.overdueAmount}
    />;
  }

  render() {
    return (<div class="railz-container" style={this._options?.container?.style}>

      {this._options?.title ? <p class="railz-title" style={this._options?.title?.style}>
        {this._options?.title?.text || ''}
      </p> : null}
      {this.renderMain()}
    </div>)
  }
}
