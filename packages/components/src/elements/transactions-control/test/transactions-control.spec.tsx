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
                 Bills
               </p>
             </div>
             <railz-error-image statuscode="404"></railz-error-image>
           </div>
         </mock:shadow-root>
      </railz-transactions-control>
    `);
  });

  it('renders with data', async () => {
    jest.spyOn(TransactionsControlUtils, 'getReportData').mockImplementation(() =>
      Promise.resolve({
        meta: {
          reportId: [
            '627b5f4b5a630518301c1b62',
            '627b5f48a7fe182dc5889fcc',
            '627b5f4f3251890d230e8011',
            '627b5f4f6913f122bd39d8cf',
            '627b5f5450d5ca16a937f69c',
            '627b5f4a3251890d230e8000',
            '627b5f4a6913f122bd39d8c3',
            '627b5f51a7fe182dc5889fe3',
            '627b5f4eec63b9728f664b13',
            '627b5f495a630518301c1b5d',
            '627b5f4ba7c0957bae35cb98',
          ],
          startDate: '2021-05-23T00:00:00.000Z',
          endDate: '2022-03-01T00:00:00.000Z',
          serviceName: 'quickbooks',
          businessName: 'TestBusinessAutomationPlaidQBO',
          createdAt: '2022-05-11T06:40:20Z',
          updatedAt: '2022-05-11T07:01:29Z',
        },
        data: {
          unpaidAmount: 34342.5,
          paidAmount: 1318,
          overdueAmount: 34342.5,
        },
      }),
    );

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
              Bills
            </p>
          </div>
          <railz-progress-bar overdueamount="34342.5" paidamount="1318" reporttype="bills" unpaidamount="34342.5"></railz-progress-bar>
        </div>
      </mock:shadow-root>
    </railz-transactions-control>
    `);
  });
});

// yarn test packages/components/src/elements/transactions-control/test/transactions-control.spec.tsx
