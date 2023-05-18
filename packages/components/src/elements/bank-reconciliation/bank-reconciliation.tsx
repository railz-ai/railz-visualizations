/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State, Watch } from '@stencil/core';

import { isNil, isEqual, isEmpty } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import {
  RVBankReconciliation,
  RVBankReconciliationApiResponse,
  RVConfiguration,
  RVFilterAll,
  RVFilterBankReconciliation,
  RVOptions,
} from '../../types';
import {
  getBankReconciliationOptionsStyle,
  getConfiguration,
  getFilter,
  getOptions,
  validateRequiredParams,
} from '../../helpers/chart.utils';
import { formatCurrencyValue, isBankReconciliation } from '../../helpers/utils';

import { ConfigurationInstance } from '../../services/configuration';

import { errorLog } from '../../services/logger';

import { CheckCircleIcon, ErrorIcon } from './bank-reconciliation-icons';
import { formatReconciliatedData, getReportData } from './bank-reconciliation.utils';

@Component({
  tag: 'railz-bank-reconciliation',
  styleUrl: 'bank-reconciliation.scss',
  shadow: true,
})
export class BankReconciliation {
  /**
   * Configuration information like authentication configuration
   */
  @Prop() readonly configuration!: RVConfiguration;
  /**
   * Filter information to query the backend APIs
   */
  @Prop() readonly filter!: RVFilterBankReconciliation;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptions;

  @State() private _options: RVOptions;
  @State() private loading = '';
  @State() private _configuration: RVConfiguration;
  @State() private _filter: RVFilterBankReconciliation;
  @State() private errorStatusCode: number;

  @State() private accuracyScore: number;
  @State() private bankBalance: number;
  @State() private accountingBalance: number;
  @State() private matchedTransactions: number;
  @State() private totalTransations: number;

  private updateBankReconciliationParams = (summary: RVBankReconciliation): void => {
    const params = formatReconciliatedData(summary);
    if (params) {
      this.loading = '';
      this.accuracyScore = params.accuracyScore;
      this.bankBalance = params.bankBalance;
      this.accountingBalance = params.accountingBalance;
      this.matchedTransactions = params.matchedTransactions;
      this.totalTransations = params.totalTransations;
    }
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
    filter: RVFilterBankReconciliation,
    options: RVOptions,
    triggerRequest = true,
  ): Promise<void> => {
    this._configuration = getConfiguration(configuration);
    if (this._configuration) {
      ConfigurationInstance.configuration = this._configuration;
      try {
        this._filter = getFilter(filter as RVFilterAll) as RVFilterBankReconciliation;
        this._options = getOptions(options);
        if (validateRequiredParams(this._filter as RVFilterAll)) {
          if (isBankReconciliation(this._filter.reportType)) {
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

  @Watch('configuration')
  async watchConfiguration(newValue: RVConfiguration, oldValue: RVConfiguration): Promise<void> {
    if (newValue && oldValue && !isEqual(oldValue, newValue)) {
      await this.validateParams(newValue, this.filter, this.options);
    }
  }

  @Watch('filter')
  async watchFilter(
    newValue: RVFilterBankReconciliation,
    oldValue: RVFilterBankReconciliation,
  ): Promise<void> {
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

  private propsUpdated = async (triggerRequest = true): Promise<void> => {
    await this.validateParams(this.configuration, this.filter, this.options, triggerRequest);
  };

  /**
   * Request report data based on filter and configuration param
   * Formats retrieved data into Highcharts format using formatData
   */
  private requestReportData = async (): Promise<void> => {
    this.errorStatusCode = undefined;
    this.loading = Translations.RV_LOADING_REPORT;

    try {
      const reportData = (await getReportData({
        filter: this._filter as RVFilterAll,
      })) as RVBankReconciliationApiResponse;

      if (reportData?.reports) {
        this.updateBankReconciliationParams(reportData);
      } else if (reportData?.error?.message[0] === 'Business has no bank data') {
        errorLog(Translations.RV_ERROR_422_TITLE);
        this.errorStatusCode = 422;
      } else if (reportData?.status === 202) {
        errorLog(Translations.RV_ERROR_202_TITLE);
        this.errorStatusCode = 202;
      } else {
        errorLog(Translations.RV_ERROR_204_TITLE);
        this.errorStatusCode = 204;
      }
    } catch (error) {
      errorLog(Translations.RV_NOT_ABLE_TO_PARSE_REPORT_DATA, error);
    } finally {
      this.loading = '';
    }
  };

  componentWillLoad(): void {
    this._options = getBankReconciliationOptionsStyle(this.options);
    this.propsUpdated && this.propsUpdated();
  }

  render(): HTMLElement {
    if (this.errorStatusCode !== undefined) {
      return (
        <railz-error-image
          statusCode={this.errorStatusCode || 500}
          {...this._options?.errorIndicator}
        />
      );
    }
    if (
      isNil(this.accuracyScore) ||
      isNil(this.bankBalance) ||
      isNil(this.accountingBalance) ||
      isNil(this.matchedTransactions) ||
      isNil(this.totalTransations) ||
      !isEmpty(this.loading)
    ) {
      return <span></span>;
    }
    const getColor = (score: number): string => {
      if (score < 50) {
        return '#FFD738';
      }
      if (score < 75) {
        return '#009BBD';
      }
      return '#00884F';
    };

    const getData = (score: number): number[] => {
      return [score];
    };
    const accuracyScoreChartOptions = {
      chart: {
        height: '64px',
        width: '64px',
        type: 'circle',
        gauge: {
          startAngle: 0,
          endAngle: 360,
          size: '100%',
          innerRadius: '80%',
          getColor: getColor,
          getData: getData,
          maxScore: 100,
        },
      },
    };

    const AccuracyScore = (): HTMLElement => (
      <div class="rv-grid-accuracy-score" style={this._options?.reconciliation?.gridAccuracyScore}>
        <div class="rv-section-container" style={this._options?.reconciliation?.sectionContainer}>
          <p class="rv-title" style={this._options?.reconciliation?.title}>
            {Translations.RV_BANK_RECONCILIATION_ACCURACY_SCORE}
          </p>
          <railz-tooltip
            tooltipStyle={{
              position: 'bottom-center',
              ...this._options?.tooltipIndicator,
              style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={
              this._options?.reconciliation?.accuracyScoreContent?.tooltip?.description ||
              Translations[`RV_TOOLTIP_ACCURACY_SCORE`]
            }
          />
        </div>
        <div class="rv-section-container" style={this._options?.reconciliation?.sectionContainer}>
          <railz-gauge-chart
            options={accuracyScoreChartOptions}
            data={{
              score: this.accuracyScore,
              rating: '',
              lastUpdated: '',
              percentage: true,
            }}
          />
          <p class="rv-subtitle" style={this._options?.reconciliation?.subtitle}>
            {Translations.RV_BANK_RECONCILIATION_ACCURACY_SCORE_TRANSACTIONS}
          </p>
        </div>
      </div>
    );

    const diff = Math.abs(this.accountingBalance - this.bankBalance);
    const MatchedInsight = (): HTMLElement => (
      <div class="rv-grid" style={this._options?.reconciliation?.grid}>
        <p class="rv-title" style={this._options?.reconciliation?.title}>
          {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS}
        </p>
        <div
          class="rv-section-container rv-matched-insight-section-container"
          style={this._options?.reconciliation?.sectionParentContainer}
        >
          <div
            class="rv-section-child-container"
            style={this._options?.reconciliation?.sectionChildContainer}
          >
            <p
              class="rv-subtitle rv-matched-insight-subtitle"
              style={this.options?.reconciliation?.subtitle}
            >
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_SUBHEADING}
            </p>
            <div class="rv-section-item">
              <railz-progress-bar
                paidAmount={this.matchedTransactions}
                overdueAmount={0}
                unpaidAmount={this.totalTransations - this.matchedTransactions}
                options={{
                  hideLabels: true,
                }}
              />
            </div>
            <p class="rv-bar-text" style={this.options?.reconciliation?.subtitle}>
              {`${this.matchedTransactions?.toString()}
            ${Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_OF}
            ${this.totalTransations?.toString()}`}
            </p>
          </div>
          <div
            class="rv-section-child-container"
            style={this._options?.reconciliation?.sectionChildContainer}
          >
            <p
              class="rv-subtitle rv-matched-insight-subtitle"
              style={this.options?.reconciliation?.subtitle}
            >
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_ACCOUNTING_BALANCE}
            </p>
            <p class="rv-section-number" style={this.options?.reconciliation?.sectionNumber}>
              {formatCurrencyValue(this.accountingBalance)}
            </p>
          </div>
          <div
            class="rv-section-child-container"
            style={this._options?.reconciliation?.sectionChildContainer}
          >
            <p
              class="rv-subtitle rv-matched-insight-subtitle"
              style={this.options?.reconciliation?.subtitle}
            >
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_BANK_BALANCE}
            </p>
            <p class="rv-section-number" style={this._options?.reconciliation?.sectionNumber}>
              {formatCurrencyValue(this.bankBalance)}
            </p>
          </div>
          <p
            class="rv-section-number rv-section-equals"
            style={this._options?.reconciliation?.sectionNumber}
          >
            {'='}
          </p>
          <div
            class="rv-section-child-container"
            style={this._options?.reconciliation?.sectionChildContainer}
          >
            <p
              class="rv-subtitle rv-matched-insight-subtitle"
              style={this._options?.reconciliation?.subtitle}
            >
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_CALCULATION}
            </p>
            <div class="rv-section-icon">
              <div class="rv-icon">{diff !== 0 ? <ErrorIcon /> : <CheckCircleIcon />}</div>
              <p
                class="rv-section-number rv-section-number-icon"
                style={this._options?.reconciliation?.sectionNumber}
              >
                {formatCurrencyValue(diff)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div class="rv-container" style={this._options?.container?.style}>
        <AccuracyScore />
        <MatchedInsight />
      </div>
    );
  }
}
