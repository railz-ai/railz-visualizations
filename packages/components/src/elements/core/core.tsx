/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';
import { isEqual } from 'lodash-es';

import {
  isCreditScore,
  isIncomeStatements,
  isStatements,
  isTransactions,
} from '../../helpers/utils';
import {
  RVConfiguration,
  RVFilterAll,
  RVFilterAllReportTypes,
  RVFilterBankAccount,
  RVFilterFinancialRatio,
  RVFilterCreditScore,
  RVFilterIncomeStatementsType,
  RVFilterStatements,
  RVFilterTransactions,
  RVOptions,
  RVReportTypes,
  RVFilterBankReconciliation,
} from '../../types';
import { getConfiguration, getFilter } from '../../helpers/chart.utils';
import { ConfigurationInstance } from '../../services/configuration';

@Component({
  tag: 'railz-visualizations',
  styleUrl: 'core.scss',
  shadow: true,
})
export class Core {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter: RVFilterAllReportTypes;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options: RVOptions;

  @State() private _filter: RVFilterAllReportTypes;
  @State() private _configuration: RVConfiguration;

  @State() private errorStatusCode: number;

  private propsUpdated = (): void => {
    this.validateParams(this.configuration, this.filter);
  };

  /**
   * Validates if configuration was passed correctly before setting filter
   * @param configuration - Config for authentication
   * @param filter - filter to decide chart type to show
   */
  private validateParams = (
    configuration: RVConfiguration,
    filter: RVFilterAllReportTypes,
  ): void => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      this._filter = getFilter(filter as RVFilterAll);
      if (!this._filter) {
        this.errorStatusCode = 204;
      }
    } else {
      this.errorStatusCode = 0;
    }
  };

  @Watch('filter')
  watchFilter(newValue: RVFilterAllReportTypes, oldValue: RVFilterAllReportTypes): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(this.configuration, newValue);
    }
  }

  @Watch('configuration')
  watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): void {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      this.validateParams(newValue, this.filter);
    }
  }

  componentDidLoad(): void {
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    if (this.errorStatusCode === 0) {
      return null;
    }

    if (this.errorStatusCode !== undefined) {
      return (
        <div class="rv-container">
          <railz-error-image statusCode={this.errorStatusCode || 500} />
        </div>
      );
    }

    const reportType = (this._filter as RVFilterAll)?.reportType;

    if (RVReportTypes.BANK_RECONCILIATION === reportType) {
      return (
        <railz-bank-reconciliation
          configuration={this.configuration}
          filter={this.filter as RVFilterBankReconciliation}
          options={this.options}
        />
      );
    }

    if (RVReportTypes.BUSINESS_VALUATIONS === reportType) {
      return (
        <railz-business-valuations
          configuration={this.configuration}
          filter={this.filter as any}
          options={this.options}
        />
      );
    }

    if (RVReportTypes.BANK_ACCOUNT === reportType) {
      return (
        <railz-bank-accounts
          configuration={this.configuration}
          filter={this.filter as RVFilterBankAccount}
          options={this.options}
        />
      );
    }

    if (RVReportTypes.FINANCIAL_RATIO === reportType) {
      return (
        <railz-financial-ratios
          configuration={this.configuration}
          filter={this.filter as RVFilterFinancialRatio}
          options={this.options}
        />
      );
    }

    if (isCreditScore(reportType)) {
      return (
        <railz-credit-score
          configuration={this.configuration}
          filter={this.filter as RVFilterCreditScore}
          options={this.options}
        />
      );
    }

    if (isIncomeStatements(reportType)) {
      return (
        <railz-income-statements
          configuration={this.configuration}
          filter={this.filter as RVFilterIncomeStatementsType}
          options={this.options}
        />
      );
    }
    if (isStatements(reportType)) {
      return (
        <railz-statements-chart
          configuration={this.configuration}
          filter={this.filter as RVFilterStatements}
          options={this.options}
        />
      );
    }
    if (isTransactions(reportType)) {
      return (
        <railz-transactions-control
          configuration={this.configuration}
          filter={this.filter as RVFilterTransactions}
          options={this.options}
        />
      );
    }

    return <span />;
  }
}
