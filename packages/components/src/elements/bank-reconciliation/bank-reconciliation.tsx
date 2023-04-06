/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State } from '@stencil/core';

import { isNil } from 'lodash-es';

import Translations from '../../config/translations/en.json';
import { RVOptionsBankReconciliationStyle } from '../../types';
import { getBankReconciliationOptionsStyle } from '../../helpers/chart.utils';
import { formatCurrencyValue } from '../../helpers/utils';

import { CheckCircleIcon, ErrorIcon } from './bank-reconciliation-icons';

@Component({
  tag: 'railz-bank-reconciliation',
  styleUrl: 'bank-reconciliation.scss',
  shadow: true,
})
export class BankReconciliation {
  /**
   * The Accuracy Score is the precision level of reconciliation by taking into account the number of matched transactions and the value of those transactions.
   */
  @Prop() readonly accuracyScore: number;
  /**
   * Banking Balance
   */
  @Prop() readonly bankBalance: number;
  /**
   * Accounting Balance
   */
  @Prop() readonly accountingBalance: number;
  /**
   * Matched Number of Transactions (exclude unmatched ones)
   */
  @Prop() readonly matchedTransactions: number;
  /**
   * Total Number of Transactions
   */
  @Prop() readonly totalTransations: number;
  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptionsBankReconciliationStyle;

  @State() private _options: RVOptionsBankReconciliationStyle;

  componentWillLoad(): void {
    this._options = getBankReconciliationOptionsStyle(this.options);
  }

  render(): HTMLElement {
    if (
      isNil(this.accuracyScore) ||
      isNil(this.bankBalance) ||
      isNil(this.accountingBalance) ||
      isNil(this.matchedTransactions) ||
      isNil(this.totalTransations)
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
      <div class="rv-grid-accuracy-score" style={this._options?.gridAccuracyScore}>
        <div class="rv-section-container" style={this._options?.sectionContainer}>
          <p class="rv-title" style={this.options?.title}>
            {Translations.RV_BANK_RECONCILIATION_ACCURACY_SCORE}
          </p>
          <railz-tooltip
            tooltipStyle={{
              position: 'bottom-center',
              ...this._options?.tooltipIndicator,
              style: { marginLeft: '5px', ...this._options?.tooltipIndicator?.style },
            }}
            tooltipText={
              this._options?.accuracyScoreContent?.tooltip?.description ||
              Translations[`RV_TOOLTIP_ACCURACY_SCORE`]
            }
          />
        </div>
        <div class="rv-section-container" style={this._options?.sectionContainer}>
          <railz-gauge-chart
            options={accuracyScoreChartOptions}
            data={{
              score: this.accuracyScore,
              rating: '',
              lastUpdated: '',
              percentage: true,
            }}
          />
          <p class="rv-subtitle" style={this._options?.subtitle}>
            {Translations.RV_BANK_RECONCILIATION_ACCURACY_SCORE_TRANSACTIONS}
          </p>
        </div>
      </div>
    );

    const diff = Math.abs(this.accountingBalance - this.bankBalance);
    const MatchedInsight = (): HTMLElement => (
      <div class="rv-grid" style={this._options?.grid}>
        <p class="rv-title" style={this._options?.title}>
          {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS}
        </p>
        <div
          class="rv-section-container rv-matched-insight-section-container"
          style={this._options?.sectionParentContainer}
        >
          <div class="rv-section-child-container" style={this._options?.sectionChildContainer}>
            <p class="rv-subtitle rv-matched-insight-subtitle" style={this.options?.subtitle}>
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
            <p class="rv-bar-text" style={this.options?.subtitle}>
              {`${this.matchedTransactions?.toString()}
            ${Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_OF}
            ${this.totalTransations?.toString()}`}
            </p>
          </div>
          <div class="rv-section-child-container" style={this._options?.sectionChildContainer}>
            <p class="rv-subtitle rv-matched-insight-subtitle" style={this.options?.subtitle}>
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_ACCOUNTING_BALANCE}
            </p>
            <p class="rv-section-number" style={this.options?.sectionNumber}>
              {formatCurrencyValue(this.accountingBalance)}
            </p>
          </div>
          <div class="rv-section-child-container" style={this._options?.sectionChildContainer}>
            <p class="rv-subtitle rv-matched-insight-subtitle" style={this.options?.subtitle}>
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_BANK_BALANCE}
            </p>
            <p class="rv-section-number" style={this.options?.sectionNumber}>
              {formatCurrencyValue(this.bankBalance)}
            </p>
          </div>
          <p class="rv-section-number rv-section-equals" style={this._options?.sectionNumber}>
            {'='}
          </p>
          <div class="rv-section-child-container" style={this._options?.sectionChildContainer}>
            <p class="rv-subtitle rv-matched-insight-subtitle" style={this._options?.subtitle}>
              {Translations.RV_BANK_RECONCILIATION_MATCHED_INSIGHTS_CALCULATION}
            </p>
            <div class="rv-section-icon">
              <div class="rv-icon">{diff !== 0 ? <ErrorIcon /> : <CheckCircleIcon />}</div>
              <p
                class="rv-section-number rv-section-number-icon"
                style={this._options?.sectionNumber}
              >
                {formatCurrencyValue(diff)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div class="rv-container" style={this.options?.container}>
        <AccuracyScore />
        <MatchedInsight />
      </div>
    );
  }
}
