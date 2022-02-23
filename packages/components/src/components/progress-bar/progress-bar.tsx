/* eslint-disable max-len, @typescript-eslint/no-unused-vars */
import { Component, h, Prop } from '@stencil/core';

import { formatNumber } from '../../helpers/utils';
import { isNil } from 'lodash-es';
import Translations from '../../config/translations/en.json';

@Component({
  tag: 'railz-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true,
})
export class ProgressBar {
  @Prop() readonly reportType: string;
  @Prop() readonly unpaidAmount: number;
  @Prop() readonly paidAmount: number;
  @Prop() readonly overdueAmount: number;

  private normalize = (value: number, max: number): number => (value * 100) / max;

  render(): HTMLElement {
    if(isNil(this.paidAmount) || isNil(this.unpaidAmount)) {
      return <span></span>;
    }
    return (
      <div class="railz-progress-bar-div">
        <p class="railz-progress-bar-total-unpaid">
          {Translations.TOTAL_UNPAID} {this.reportType === 'invoices' ? Translations.INVOICES : Translations.BILLS}{' '}
          <span class="railz-progress-bar-total-unpaid-value">${formatNumber(this.unpaidAmount)}</span>
        </p>

        <div class="railz-progress-bar-values">
          <div class="railz-progress-bar-values-div">
            <div>
              <p class="railz-progress-bar-label">{Translations.PAID}</p>
              <p class="railz-progress-bar-value">${formatNumber(this.paidAmount)}</p>
            </div>
            <div>
              <p class="railz-progress-bar-label railz-progress-bar-overdue">{Translations.OVERDUE}</p>
              <p class="railz-progress-bar-value railz-progress-bar-overdue">${formatNumber(this.overdueAmount) || 0}</p>
            </div>
          </div>
          <div class="railz-progress-bar">
            <span style={{width: `${this.normalize(this.paidAmount, this.unpaidAmount + this.paidAmount)}%`}}/>
          </div>
        </div>
      </div>
    );
  }
}
