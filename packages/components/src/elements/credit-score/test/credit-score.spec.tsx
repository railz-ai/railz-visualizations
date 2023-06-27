import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { CreditScore } from '../credit-score';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';

describe('railz-credit-score', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [CreditScore],
      html: `<railz-credit-score></railz-credit-score>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-credit-score>
        <mock:shadow-root></mock:shadow-root>
      </railz-credit-score>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [CreditScore],
      template: () => (
        <railz-credit-score
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.CREDIT_SCORE,
          }}
          options={{
            tooltipIndicator: {
              visible: false,
            },
          }}
        ></railz-credit-score>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-credit-score>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Railz Score
            </p>
          </div>
          <railz-error-image statuscode="404"></railz-error-image>
          <span></span>
        </div>
      </mock:shadow-root>
    </railz-credit-score>
    `);
  });
});

// yarn test packages/components/src/elements/credit-score/test/credit-score.spec.tsx
