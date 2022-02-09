import { FunctionalComponent, h } from '@stencil/core';

import Translations from '../assets/en.json';
import { formatNumber } from '../utils/utils';

interface ProgressBarProps {
  reportType: string;
  unpaidAmount: number;
  paidAmount: number;
  overdueAmount: number;
}

export const ProgressBar: FunctionalComponent<ProgressBarProps> = ({ reportType, unpaidAmount, paidAmount, overdueAmount }) => {
  const normalize = (value: number, max: number): number => (value * 100) / max;

  return (
    <div class="progress-chart-div">
      <p class="progress-chart-total-unpaid">
        {Translations.TOTAL_UNPAID} {reportType === 'invoices' ? Translations.INVOICES : Translations.BILLS}{' '}
        <span class="progress-chart-total-unpaid-value">${formatNumber(unpaidAmount)}</span>
      </p>

      <div class="progress-chart-values-div">
        <div>
          <p class="progress-chart-label">{Translations.PAID}</p>
          <p class="progress-chart-value">${formatNumber(paidAmount)}</p>
        </div>
        <div>
          <p class="progress-chart-label">{Translations.OVERDUE}</p>
          <p class="progress-chart-value">${formatNumber(overdueAmount)}</p>
        </div>
      </div>
      <progress class="progress-chart" value={normalize(paidAmount, unpaidAmount + paidAmount)} max="100" />
    </div>
  );
};
