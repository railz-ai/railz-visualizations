/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { BankReconciliation } from '../bank-reconciliation';

describe('railz-bank-reconciliation', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [BankReconciliation],
      html: `<railz-bank-reconciliation></railz-bank-reconciliation>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-reconciliation>
        <mock:shadow-root>
          <span></span>
        </mock:shadow-root>
      </railz-bank-reconciliation>
    `);
  });

  it('renders with data', async () => {
    const page = await newSpecPage({
      components: [BankReconciliation],
      template: () => (
        <railz-bank-reconciliation
          accuracyScore={90}
          bankBalance={2000}
          accountingBalance={2100}
          matchedTransactions={20}
          totalTransations={23}
        ></railz-bank-reconciliation>
      ),
    });
    expect(page.root).toEqualHtml(`<railz-bank-reconciliation>
    <mock:shadow-root>
      <div class="rv-container">
        <div class="rv-grid-accuracy-score">
          <div class="rv-section-container">
            <p class="rv-title">
              Accuracy Score
            </p>
            <railz-tooltip tooltiptext="The Accuracy Score is the precision level of reconciliation by taking into account the number of matched transactions and the value of those transactions. "></railz-tooltip>
          </div>
          <div class="rv-section-container">
            <railz-gauge-chart></railz-gauge-chart>
            <p class="rv-subtitle">
              Reconciled transactions
            </p>
          </div>
        </div>
        <div class="rv-grid">
          <p class="rv-title">
            Matched Insights
          </p>
          <div class="rv-section-container">
            <div class="rv-section-child-container">
              <p class="rv-matched-insight-subtitle rv-subtitle">
                Transactions Matched
              </p>
              <div class="rv-section-item">
                <railz-progress-bar overdueamount="0" paidamount="20" unpaidamount="3"></railz-progress-bar>
              </div>
              <p class="rv-bar-text">
                20 of 23
              </p>
            </div>
            <div class="rv-section-child-container">
              <p class="rv-matched-insight-subtitle rv-subtitle">
                Accounting Balance
              </p>
              <p class="rv-section-number">
                $2,100.00
              </p>
            </div>
            <div class="rv-section-child-container">
              <p class="rv-matched-insight-subtitle rv-subtitle">
                Bank Balance
              </p>
              <p class="rv-section-number">
                $2,000.00
              </p>
            </div>
            <p class="rv-section-equals rv-section-number">
              =
            </p>
            <div class="rv-section-child-container">
              <p class="rv-matched-insight-subtitle rv-subtitle">
                Difference
              </p>
              <div class="rv-section-icon">
                <div class="rv-icon">
                  <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8.8 12H7.2V10.4H8.8V12ZM8.8 8.8H7.2V4H8.8V8.8Z" fill="#F2A74C"></path>
                  </svg>
                </div>
                <p class="rv-section-number rv-section-number-icon">
                  $100.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mock:shadow-root>
  </railz-bank-reconciliation>`);
  });
});

// yarn test packages/components/src/elements/progress-bar/test/progress-bar.spec.tsx
