import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';

import { TransactionsControl } from '../transactions-control';
import { RVReportTypes } from '../../../types';
import { RVAllProviders } from '../../../types/enum/service-providers';
import * as TransactionsControlUtils from '../transactions-control.utils';

describe('railz-transactions-control', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      html: `<railz-transactions-control></railz-transactions-control>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
        <mock:shadow-root></mock:shadow-root>
      </railz-transactions-control>
    `);
  });

  it('renders without data', async () => {
    const page = await newSpecPage({
      components: [TransactionsControl],
      template: () => (
        <railz-transactions-control
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.BILLS,
          }}
        ></railz-transactions-control>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-transactions-control>
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
      </railz-transactions-control>
    `);
  });

  it('renders with data', async () => {
    jest
      .spyOn(TransactionsControlUtils, 'getReportData')
      .mockImplementation(() => Promise.resolve({}));

    const page = await newSpecPage({
      components: [TransactionsControl],
      template: () => (
        <railz-transactions-control
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            businessName: 'QboFrdTest',
            serviceName: RVAllProviders.QUICKBOOKS,
            reportType: RVReportTypes.BILLS,
          }}
        ></railz-transactions-control>
      ),
    });
    expect(page.root).toEqualHtml(`
    <railz-transactions-control>
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
    </railz-transactions-control>
    `);
  });
});

// yarn test packages/components/src/elements/transactions-control/test/transactions-control.spec.tsx
