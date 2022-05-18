/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, State, Prop, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';
import { ConfigurationInstance } from '../../services/configuration';
import {
  getOptions,
  getConfiguration,
  validateRequiredParams,
  getFilter,
} from '../../helpers/chart.utils';
import {
  RVBankAccounts,
  RVBankingProviders,
  RVConfiguration,
  RVFilterAll,
  RVFilterBankAccount,
  RVFormattedBankAccountsResponse,
  RVOptions,
} from '../../types';
import { formatNumber } from '../../helpers/utils';

import { getReportData } from './bank-accounts.utils';

@Component({
  tag: 'railz-bank-accounts',
  styleUrl: 'bank-accounts.scss',
  shadow: true,
})
export class BanksAccounts {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterBankAccount;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterBankAccount;
  @State() private _options: RVOptions;
  @State() private _summary: RVBankAccounts[];
  @State() private error: string;
  @State() private errorStatusCode: number;

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(newValue: RVFilterBankAccount, oldValue: RVFilterBankAccount): Promise<void> {
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
    filter: RVFilterBankAccount,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = {
          ...(getFilter(filter as RVFilterAll) as RVFilterBankAccount),
          serviceName: RVBankingProviders.PLAID,
        };
        if (this._filter) {
          this._options = getOptions(options, filter as RVFilterAll);
          const valid = validateRequiredParams(filter as RVFilterAll);
          if (valid) {
            if (triggerRequest) {
              await this.requestReportData();
            }
          } else {
            this.errorStatusCode = 204;
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

  /**
   * Request report data based on filter and configuration param
   */
  private requestReportData = async (): Promise<void> => {
    this.error = '';
    this.loading = Translations.LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVFormattedBankAccountsResponse;
      this._summary = reportData.data as RVBankAccounts[];
      if (isEmpty(this._summary)) {
        this.errorStatusCode = 204;
      }
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

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
      !isEmpty(this._summary) && (
        <div>
          <ul class="railz-bank-accounts-ul">
            <li class="railz-bank-accounts-ul-title">{this._summary[0].institutionName}</li>
            {this._summary.map((bankAccount: RVBankAccounts) => (
              <li>
                <div class="railz-bank-accounts-item-container">
                  <span class="railz-bank-accounts-item-name">{bankAccount.accountName}</span>
                  <span class="railz-bank-accounts-item-dot"></span>
                  <span class="railz-bank-accounts-item-value">
                    ${formatNumber(bankAccount.currentBalance, 2, 2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    );
  };

  render(): HTMLElement {
    const TitleElement = (): HTMLElement => (
      <p class="rv-title" style={this._options?.title?.style}>
        {(this._options?.title && this._options?.title?.text) || ''}
      </p>
    );

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          <TitleElement />
        </div>
        {this.renderMain()}
      </div>
    );
  }
}
