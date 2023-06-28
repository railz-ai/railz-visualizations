import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { IncomeStatements } from '../income-statements';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import * as PieChartUtils from '../income-statements.utils';

describe('railz-income-statements', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [IncomeStatements],
      html: `<railz-income-statements></railz-income-statements>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-income-statements>
        <mock:shadow-root></mock:shadow-root>
      </railz-income-statements>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [IncomeStatements],
      template: () => (
        <railz-income-statements
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.EXPENSES,
          }}
          options={{
            tooltipIndicator: {
              visible: false,
            },
          }}
        ></railz-income-statements>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-income-statements>
         <mock:shadow-root>
           <div class="rv-container">
             <div class="rv-header-container">
               <p class="rv-title">
                 Expenses
               </p>
             </div>
             <railz-error-image statuscode="404"></railz-error-image>
           </div>
         </mock:shadow-root>
      </railz-income-statements>
    `);
  });

  it('renders with data', async () => {
    jest.spyOn(PieChartUtils, 'getReportData').mockImplementation(() => Promise.resolve({}));

    const page = await newSpecPage({
      components: [IncomeStatements],
      template: () => (
        <railz-income-statements
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.REVENUE,
          }}
          options={{
            tooltipIndicator: {
              visible: false,
            },
          }}
        ></railz-income-statements>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-income-statements>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Revenue
            </p>
          </div>
          <div class="rv-income-statements-chart-container">
            <div id="rv-income-statements-chart"></div>
            <div class="rv-income-statements-chart-box">
              <p class="rv-income-statements-chart-text">
                $
              </p>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </railz-income-statements>
    `);
  });
});

// yarn test packages/components/src/elements/income-statements/test/income-statements.spec.tsx
