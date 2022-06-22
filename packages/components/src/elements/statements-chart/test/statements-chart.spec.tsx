import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { StatementsChart } from '../statements-chart';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as StatementsChartUtils from '../statements-chart.utils';

describe('railz-statements-chart', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      html: `<railz-statements-chart></railz-statements-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
        <mock:shadow-root></mock:shadow-root>
      </railz-statements-chart>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [StatementsChart],
      template: () => (
        <railz-statements-chart
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.BALANCE_SHEET,
          }}
        ></railz-statements-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-statements-chart>
         <mock:shadow-root>
           <div class="rv-container">
             <div class="rv-header-container">
               <p class="rv-title">
                 Balance Sheet
               </p>
             </div>
             <railz-error-image statuscode="404"></railz-error-image>
           </div>
         </mock:shadow-root>
      </railz-statements-chart>
    `);
  });

  it('renders with data', async () => {
    jest.spyOn(StatementsChartUtils, 'getReportData').mockImplementation(() => Promise.resolve({}));

    const page = await newSpecPage({
      components: [StatementsChart],
      template: () => (
        <railz-statements-chart
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            reportFrequency: RVReportFrequency.MONTH,
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.BALANCE_SHEET,
          }}
        ></railz-statements-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-statements-chart>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Balance Sheet
            </p>
          </div>
          <div class="railz-statement-chart-container" id="railz-chart"></div>
        </div>
      </mock:shadow-root>
    </railz-statements-chart>
    `);
  });
});

// yarn test packages/components/src/elements/statements-chart/test/statements-chart.spec.tsx
