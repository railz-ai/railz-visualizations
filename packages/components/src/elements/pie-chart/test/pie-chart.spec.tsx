import { newSpecPage } from '@stencil/core/testing';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { PieChart } from '../pie-chart';
import { RVReportFrequency, RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as PieChartUtils from '../pie-chart.utils';

describe('railz-pie-chart', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [PieChart],
      html: `<railz-pie-chart></railz-pie-chart>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-pie-chart>
        <mock:shadow-root></mock:shadow-root>
      </railz-pie-chart>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [PieChart],
      template: () => (
        <railz-pie-chart
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
            reportType: RVReportTypes.EXPENSES,
          }}
        ></railz-pie-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-pie-chart>
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
      </railz-pie-chart>
    `);
  });

  it('renders with data', async () => {
    jest.spyOn(PieChartUtils, 'getReportData').mockImplementation(() => Promise.resolve({}));

    const page = await newSpecPage({
      components: [PieChart],
      template: () => (
        <railz-pie-chart
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
            reportType: RVReportTypes.REVENUE,
          }}
        ></railz-pie-chart>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-pie-chart>
      <mock:shadow-root>
        <div class="rv-container">
          <div class="rv-header-container">
            <p class="rv-title">
              Revenue
            </p>
          </div>
          <div class="railz-pie-chart-container">
            <div id="railz-pie-chart"></div>
            <div class="railz-pie-chart-box">
              <p class="railz-pie-chart-text">
                $
              </p>
            </div>
          </div>
        </div>
      </mock:shadow-root>
    </railz-pie-chart>
    `);
  });
});

// yarn test packages/components/src/elements/pie-chart/test/pie-chart.spec.tsx
