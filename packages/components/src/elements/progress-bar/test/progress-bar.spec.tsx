import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { ProgressBar } from '../progress-bar';
import { RVReportTypes } from '../../../types';

describe('railz-progress-bar', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      html: `<railz-progress-bar></railz-progress-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-progress-bar>
        <mock:shadow-root>
          <span></span>
        </mock:shadow-root>
      </railz-progress-bar>
    `);
  });

  it('renders with data', async () => {
    const page = await newSpecPage({
      components: [ProgressBar],
      template: () => (
        <railz-progress-bar
          reportType={RVReportTypes.BILLS}
          unpaidAmount={34342.5}
          paidAmount={1318}
          overdueAmount={34342.5}
        ></railz-progress-bar>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-progress-bar>
      <mock:shadow-root>
        <div class="rv-progress-bar-div">
          <p aria-label="Total Unpaid 34,342.5" class="rv-progress-bar-total-unpaid">
            Total Unpaid Bills
            <span aria-hidden="" class="rv-progress-bar-total-unpaid-value">
              $34,342.5
            </span>
          </p>
          <div class="railz-progress-bar-values">
            <div class="rv-progress-bar-values-div">
              <div>
                <p aria-label="Paid 1,318" class="rv-progress-bar-label">
                  Paid
                </p>
                <p aria-hidden="" class="rv-progress-bar-value">
                  $1,318
                </p>
              </div>
              <div>
                <p aria-label="Overdue 34,342.5" class="rv-progress-bar-label rv-progress-bar-overdue">
                  Overdue
                </p>
                <p aria-hidden="" class="rv-progress-bar-overdue rv-progress-bar-value">
                  $34,342.5
                </p>
              </div>
            </div>
            <div class="rv-progress-bar">
              <span style="width: 3.6959661249842264%;"></span>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </railz-progress-bar>
    `);
  });
});

// yarn test packages/components/src/elements/progress-bar/test/progress-bar.spec.tsx
