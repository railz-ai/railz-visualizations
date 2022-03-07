/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, Prop, h, State } from '@stencil/core';

import { isNil } from 'lodash-es';

import { formatNumber } from '../../helpers/utils';
import Translations from '../../config/translations/en.json';
import { RVNoFrequencyTypes, RVOptionsBarStyle, RVReportTypes } from '../../types';
import { getBarOptionsStyle } from '../../helpers/chart.utils';

@Component({
  tag: 'railz-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true,
})
export class ProgressBar {
  /**
   * To indicate if its an invoice or bill
   */
  @Prop() readonly reportType?: RVNoFrequencyTypes;
  /**
   * For unpaid amount of an invoice or bill
   */
  @Prop() readonly unpaidAmount: number;
  /**
   * For paid amount of an invoice or bill
   */
  @Prop() readonly paidAmount: number;
  /**
   * For overdue amount of an invoice or bill
   */
  @Prop() readonly overdueAmount: number;

  /**
   * For whitelabeling styling
   */
  @Prop() readonly options?: RVOptionsBarStyle;

  @State() private _options: RVOptionsBarStyle;

  componentWillLoad(): void {
    this._options = getBarOptionsStyle(this.options);
  }

  private normalize = (value: number, max: number): number => (value * 100) / max;
  private titleMapping = {
    [RVReportTypes.INVOICES]: Translations.INVOICES,
    [RVReportTypes.BILLS]: Translations.BILLS,
  };

  render(): HTMLElement {
    if (isNil(this.paidAmount) || isNil(this.unpaidAmount)) {
      return <span></span>;
    }
    return (
      <div class="railz-progress-bar-div">
        <p
          class="railz-progress-bar-total-unpaid"
          style={this._options?.titleStyle}
          aria-label={`${Translations.TOTAL_UNPAID} ${formatNumber(this.unpaidAmount)}`}
        >
          {Translations.TOTAL_UNPAID} {this.titleMapping[this.reportType] || ''}{' '}
          <span
            class="railz-progress-bar-total-unpaid-value"
            style={this._options?.titleValueStyle}
            aria-hidden={true}
          >
            ${formatNumber(this.unpaidAmount)}
          </span>
        </p>

        <div class="railz-progress-bar-values">
          <div class="railz-progress-bar-values-div">
            <div>
              <p
                class="railz-progress-bar-label"
                style={this._options?.subTitle1Style}
                aria-label={`${Translations.PAID} ${formatNumber(this.paidAmount)}`}
              >
                {Translations.PAID}
              </p>
              <p
                class="railz-progress-bar-value"
                style={this._options?.subTitleValue1Style}
                aria-hidden={true}
              >
                ${formatNumber(this.paidAmount)}
              </p>
            </div>
            <div>
              <p
                class="railz-progress-bar-label railz-progress-bar-overdue"
                style={this._options?.subTitle2Style}
                aria-label={`${Translations.OVERDUE} ${formatNumber(this.overdueAmount) || 0}`}
              >
                {Translations.OVERDUE}
              </p>
              <p
                class="railz-progress-bar-value railz-progress-bar-overdue"
                style={this._options?.subTitleValue2Style}
                aria-hidden={true}
              >
                ${formatNumber(this.overdueAmount) || 0}
              </p>
            </div>
          </div>
          <div class="railz-progress-bar" style={this._options?.barStyle}>
            <span
              style={{
                width: `${this.normalize(this.paidAmount, this.unpaidAmount + this.paidAmount)}%`,
                ...this._options?.progressStyle,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
