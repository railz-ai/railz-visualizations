import {Component, h, Prop, State, Watch} from '@stencil/core';
import Translations from '../../config/translations/en.json';
import {errorLog} from '../../services/logger';

import {
  RVConfiguration,
  RVFilterFrequency,
  RVFormattedStatementData,
  RVFormattedStatementResponse,
  RVOptions
} from '../../types';
import {formatData, getReportData} from "./statements-chart.utils";
import {RVFinancialStatementsTypes} from "../../types/enum/report-type";
import {getConfiguration, getDateFilter, getHighchartsParams, getOptions} from "../../helpers/chart.utils";

@Component({
  tag: 'railz-statements-chart',
  styleUrl: './statements-chart.scss',
  shadow: true,
})
export class StatementsChart {
  @Prop() configuration!: RVConfiguration;
  @Prop() filter!: RVFilterFrequency;
  @Prop() options: RVOptions;

  @State()
  private loading: string = '';
  @State()
  private _configuration: RVConfiguration;
  @State()
  private _filter: RVFilterFrequency;
  @State()
  private _options: RVOptions;
  @State()
  private _dataFormatted: RVFormattedStatementData;
  @State()
  private error: string;
  @State()
  private errorStatusCode: number;
  @State()
  private chartOptions: any;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   */
  validateParams = async (configuration: RVConfiguration, filter: RVFilterFrequency) => {
    this._configuration = getConfiguration(configuration);
    console.log('Requesting Data Statement 1');
    if (this._configuration) {
      this._filter = getDateFilter(filter) as RVFilterFrequency;
      this._options = getOptions(this.options, this._filter);
      console.log('Requesting Data Statement');
      await this.requestReportData();
    }
  };

  @Watch('filter')
  async validateFilter(newValue: RVFilterFrequency, _: RVFilterFrequency) {
    await this.validateParams(this.configuration, newValue);
  }

  @Watch('configuration')
  async validateConfiguration(newValue: RVConfiguration, _: RVConfiguration) {
    console.log(newValue);
    console.log('newValue Statement');
    await this.validateParams(newValue, this.filter);
  }

  propsUpdated = async () => {
    await this.validateParams(this.configuration, this.filter);
  };

  /**
   * Request report data based on filter and configuration
   * formats retrieved data into Highcharts format
   */
  requestReportData = async () => {
    this.loading = Translations.LOADING_REPORT;
    let reportData = await getReportData({
      filter: this._filter,
      configuration: this._configuration
    }) as RVFormattedStatementResponse
    try {
      if (reportData?.data) {
        this._dataFormatted = formatData({
          summary: reportData.data,
          reportType: this._filter.reportType as RVFinancialStatementsTypes,
          reportFrequency: this._filter?.reportFrequency,
          colors: this._options?.chart?.colors
        });
        console.log('Retrieved Data Statement');
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

  updateHighchartsParams = () => {
    let options = getHighchartsParams({dataFormatted: this._dataFormatted, options: this._options});
    if (options) {
      this.chartOptions = options;
      console.log(this.chartOptions);
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
    return <railz-chart-container options={this.chartOptions}/>;
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
