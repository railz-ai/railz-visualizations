/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';

import {
  RVBillInvoiceSummary,
  RVConfiguration,
  RVFilterDate,
  RVFormattedTransactionResponse,
  RVOptions,
  RVContent,
} from '../../types';
import {
  getConfiguration,
  getFilter,
  getOptions,
  getContent,
  validateRequiredParams,
} from '../../helpers/chart.utils';

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
   * Content text/info
   */
  @Prop() readonly content?: RVContent;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterDate;
  @State() private _options: RVOptions;
  @State() private _content: RVContent;
  @State() private _dataFormatted: RVBillInvoiceSummary;
  @State() private errorStatusCode = 0;

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
    filter: RVFilterDate,
    options: RVOptions,
    content: RVContent,
    triggerRequest = true,
  ): Promise<void> => {
    this.errorStatusCode = 0;
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter) as RVFilterDate;
        this._options = getOptions(options, filter);
        this._content = getContent(content);
        const valid = validateRequiredParams(this._filter);
        if (valid) {
          if (triggerRequest) {
            await this.requestReportData();
          }
        } else {
          this.errorStatusCode = 204;
          errorLog(Translations.ERROR_204_TITLE);
        }
      } catch (e) {
        this.errorStatusCode = 500;
        errorLog(Translations.RV_ERROR_PARSING_OPTIONS, e);
      }
    } else {
      this.errorStatusCode = 500;
      errorLog(Translations.RV_CONFIGURATION_NOT_PRESENT);
    }
  };

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options, this.content);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterDate, oldValue: RVFilterDate): Promise<void> {
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
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = 0;
    this.loading = Translations.LOADING_REPORT;
    const reportData = (await getTransactionsData({
      filter: this._filter,
    })) as RVFormattedTransactionResponse;
    try {
      if (reportData?.data) {
        this._dataFormatted = reportData?.data;
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

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private renderMain(): HTMLElement {
    if (this.errorStatusCode !== 0) {
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
