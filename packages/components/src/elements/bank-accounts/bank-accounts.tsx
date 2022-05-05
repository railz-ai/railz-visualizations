/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, State, Prop, Watch } from '@stencil/core';
import { isEqual } from 'lodash-es';
// import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';
import { ConfigurationInstance } from '../../services/configuration';
import {
  getOptions,
  getConfiguration,
  getDateFilter,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import {
  RVAllFilter,
  RVBankAccountsReportSummary,
  RVBankingProviders,
  RVConfiguration,
  RVFilterDate,
  RVFormattedBankAccountsResponse,
  RVOptions,
} from '../../types';

import { getReportData } from './bank-accounts.utils';

@Component({
  tag: 'railz-bank-accounts',
  styleUrl: 'bank-accounts.scss',
  shadow: true,
})
export class ProgressBar {
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
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVAllFilter;
  @State() private _options: RVOptions;
  // @State() private _summary: RVFinancialRatioSummary;
  // @State() private _selected: RVFinancialRatioItem;
  @State() private error: string;
  @State() private errorStatusCode: number;
  @State() private elements = [
    { name: 'Plaid Checking', value: '$110.00' },
    { name: 'Plaid Saving', value: '$210.00' },
    { name: 'Plaid CD', value: '$1,000.00' },
    { name: 'Plaid Credit Card', value: '$410.00' },
    { name: 'Plaid Money Market', value: '$43,200.00' },
    { name: 'Plaid IRA', value: '$320.76' },
    { name: 'Plaid 401 K', value: '$23,631.98' },
    { name: 'Plaid Student Loan', value: '$65,262.00' },
    { name: 'Plaid Mortgage', value: '$56,302.06' },
  ];

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterDate, oldValue: RVFilterDate): Promise<void> {
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

  componentWillLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, this.options, triggerRequest);
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   * @param options: Whitelabeling options
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
        this._filter = {
          ...getDateFilter(filter),
          serviceName: RVBankingProviders.PLAID,
        } as RVFilterDate;
        this._options = getOptions(options, filter);
        const valid = validateRequiredParams(filter);
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

  /**
   * Request report data based on filter and configuration param
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterDate,
      })) as RVFormattedBankAccountsResponse;
      // console.log('requestReportData', { reportData });
      const bankAccounts = reportData.data as RVBankAccountsReportSummary;
      console.log({ bankAccounts });
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  render(): HTMLElement {
    console.log({
      loading: this.loading,
      error: this.error,
      errorStatusCode: this.errorStatusCode,
      options: this._options,
    });

    return (
      <div>
        <ul class="railz-bank-accounts-ul">
          <li class="railz-bank-accounts-ul-title">Citibank Online</li>
          {this.elements.map((element) => {
            return (
              <li class="">
                <div class="railz-bank-accounts-item-container">
                  <span class="railz-bank-accounts-item-name">{element.name}</span>
                  <span class="railz-bank-accounts-item-dot"></span>
                  <span class="railz-bank-accounts-item-value">{element.value}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
