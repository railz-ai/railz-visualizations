/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, State, Prop, Watch } from '@stencil/core';
import { isEmpty, isEqual } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { errorLog } from '../../services/logger';
import { ConfigurationInstance } from '../../services/configuration';
import {
  getOptions,
  getConfiguration,
  getFilter,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import {
  RVBankAccounts,
  RVConfiguration,
  RVFilterAll,
  RVFilterBankAccount,
  RVFormattedBankAccountsResponse,
  RVOptions,
} from '../../types';
import { formatNumber, getTitleByReportType, isBankAccounts } from '../../helpers/utils';

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
        this._filter = getFilter(filter as RVFilterAll) as RVFilterBankAccount;
        this._options = getOptions(options);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (isBankAccounts(this._filter.reportType)) {
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
        errorLog(e);
      }
    } else {
      this.errorStatusCode = 0;
    }
  };

  /**
   * Request report data based on filter and configuration param
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = undefined;
    this.loading = Translations.RV_LOADING_REPORT;
    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVFormattedBankAccountsResponse;
      this._summary = reportData.data as RVBankAccounts[];
      if (reportData?.error?.message[0] === 'Service provider not supported') {
        errorLog(Translations.DASHBOARD_FINANCIAL_SUMMARY_CHART_ERROR_ASP_NOT_SUPPORTED);
        this.errorStatusCode = 404;
      } else if (isEmpty(this._summary)) {
        this.errorStatusCode = 204;
      }
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  private getAllBanks(): { [key: string]: RVBankAccounts[] } {
    const institutionNames = this._summary?.map(({ institutionName }) => institutionName);
    const uniqueBankAccounts = new Set(institutionNames);
    const diffBanks = {};
    uniqueBankAccounts.forEach((institutionName) => {
      diffBanks[institutionName] = this._summary?.filter(
        ({ institutionName: internalInstitutionName }) =>
          internalInstitutionName === institutionName,
      );
    });
    return diffBanks;
  }

  private renderMain = (): HTMLElement => {
    if (this.errorStatusCode !== undefined) {
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

    const diffBanks = this.getAllBanks();

    return (
      !isEmpty(this._summary) && (
        <div class="rv-bank-list">
          <ul class="rv-bank-accounts-ul" style={this._options?.table?.style}>
            {Object.keys(diffBanks).map((bank) => (
              <div>
                <li class="rv-bank-accounts-ul-title" style={this._options?.table?.title}>
                  {bank}
                </li>
                {diffBanks[bank].map((bankAccount: RVBankAccounts) => (
                  <li>
                    <div
                      class="rv-bank-accounts-item-container"
                      style={this._options?.table?.itemContainer}
                    >
                      <span
                        class="rv-bank-accounts-item-name"
                        style={this._options?.table?.itemName}
                      >
                        {bankAccount.accountName}
                      </span>
                      <span
                        class="rv-bank-accounts-item-dot"
                        style={this._options?.table?.itemSeperator}
                      ></span>
                      <span
                        class="rv-bank-accounts-item-value"
                        style={this._options?.table?.itemValue}
                      >
                        ${formatNumber(bankAccount.currentBalance, 2, 2)}
                      </span>
                    </div>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      )
    );
  };

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

    const TitleElement = (): HTMLElement => (
      <p class="rv-title" style={this._options?.title?.style}>
        {this._options?.content?.title || getTitleByReportType(this._filter?.reportType) || ''}{' '}
        {this._options?.tooltipIndicator?.visible &&
        this._options?.content?.tooltip?.description ? (
          <railz-tooltip
            tooltipStyle={{
              position: 'bottom-center',
              ...this._options?.tooltipIndicator,
              style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={this._options?.content?.tooltip?.description}
          />
        ) : null}
      </p>
    );

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <div class="rv-header-container">
          {this._options?.title?.visible === false ? '' : <TitleElement />}
        </div>
        {this.renderMain()}
      </div>
    );
  }
}
