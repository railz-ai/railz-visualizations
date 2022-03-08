/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';

import {
  RVBillInvoiceSummary,
  RVConfiguration,
  RVContent,
  RVFilterDate,
  RVFormattedTransactionResponse,
  RVOptions,
} from '../../types';
import { getConfiguration, getFilter, getOptions } from '../../helpers/chart.utils';

import { ConfigurationInstance } from '../../services/configuration';

import { getTransactionsData } from './transactions-control.utils';

@Component({
  tag: 'railz-transactions-control',
  styleUrl: './transactions-control.scss',
  shadow: true,
})
export class TransactionsControl {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterDate;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;
  /**
   * Content for text/info
   */
  @Prop() readonly content?: RVContent;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterDate;
  @State() private _options: RVOptions;
  @State() private _dataFormatted: RVBillInvoiceSummary;
  @State() private error: string;
  @State() private errorStatusCode: number;

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options - various options that can change display
   * @param content - content to text that should display
   * @param triggerRequest - indicate if api request should be made
   */
  private validateParams = async (
    configuration: RVConfiguration,
    filter: RVFilterDate,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter) as RVFilterDate;
        if (options) {
          this._options = getOptions(options, filter);
        }
        if (triggerRequest) {
          await this.requestReportData();
        }
      } catch (e) {
        this.errorStatusCode = 500;
      }
    } else {
      this.errorStatusCode = 500;
    }
  };

  @Watch('configuration')
  watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  watchFilter(newValue: RVFilterDate, oldValue: RVFilterDate): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, newValue, this.options);
    }
  }

  @Watch('options')
  watchOptions(newValue: RVOptions, oldValue: RVOptions): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter, newValue);
    }
  }

  @Watch('content')
  watchContent(newValue: RVContent, oldValue: RVContent): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, this.filter, this.options);
    }
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, this.options, triggerRequest);
  };

  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    const reportData = (await getTransactionsData({
      filter: this._filter,
    })) as RVFormattedTransactionResponse;
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
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain(): HTMLElement {
    if (!isEmpty(this.error)) {
      return (
        <railz-error-image
          text={this.error}
          statusCode={this.errorStatusCode || 500}
          {...this._options?.errorIndicator}
        />
      );
    }
    if (!isEmpty(this.loading)) {
      return <railz-loading loadingText={this.loading} {...this._options?.loadingIndicator} />;
    }
    if (!isEmpty(this._dataFormatted)) {
      return (
        <railz-progress-bar
          reportType={this._filter?.reportType}
          unpaidAmount={this._dataFormatted.unpaidAmount}
          paidAmount={this._dataFormatted.paidAmount}
          overdueAmount={this._dataFormatted.overdueAmount}
          options={this._options?.bar}
        />
      );
    }
  }

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
