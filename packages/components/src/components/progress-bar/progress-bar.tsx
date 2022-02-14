import {Component, h, Prop} from '@stencil/core';
import {formatNumber} from "../../helpers/utils";
import Translations from '../../config/translations/en.json';

@Component({
  tag: 'railz-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true,
})
export class ProgressBar {
  @Prop() reportType: string;
  @Prop() unpaidAmount: number;
  @Prop() paidAmount: number;
  @Prop() overdueAmount: number;


  normalize = (value: number, max: number): number => (value * 100) / max;


  render() {
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
              <p class="railz-progress-bar-value railz-progress-bar-overdue">${formatNumber(this.overdueAmount)}</p>
            </div>
          </div>
          <progress class="railz-progress-bar"
                    value={this.normalize(this.paidAmount, this.unpaidAmount + this.paidAmount)}
                    max={100}/>
        </div>
      </div>
    );
  }

}
