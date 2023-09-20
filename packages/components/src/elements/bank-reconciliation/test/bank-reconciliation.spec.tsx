/* eslint-disable max-len */
import { newSpecPage } from '@stencil/core/testing';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from '@stencil/core';

import { RVReportFrequency, RVReportTypes } from '../../../types';

import { BankReconciliation } from '../bank-reconciliation';
import * as BankReconciliationUtils from '../bank-reconciliation.utils';

describe('railz-bank-reconciliation', () => {
  it('renders without props', async () => {
    const page = await newSpecPage({
      components: [BankReconciliation],
      html: `<railz-bank-reconciliation></railz-bank-reconciliation>`,
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-reconciliation>
        <mock:shadow-root>
          <railz-error-image statuscode="500"></railz-error-image>
        </mock:shadow-root>
      </railz-bank-reconciliation>
    `);
  });

  it('renders with service not supported', async () => {
    jest.spyOn(BankReconciliationUtils, 'getReportData').mockImplementation((): any =>
      Promise.resolve({
        error: {
          message: ['Service provider not supported'],
          statusCode: 404,
        },
      }),
    );

    const page = await newSpecPage({
      components: [BankReconciliation],
      template: () => (
        <railz-bank-reconciliation
          configuration={{
            token: 'eyJhbG',
            debug: true,
          }}
          filter={{
            startDate: '2021-05-01',
            endDate: '2022-05-31',
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BANK_RECONCILIATION,
            reportFrequency: RVReportFrequency.MONTH,
          }}
        ></railz-bank-reconciliation>
      ),
    });
    expect(page.root).toEqualHtml(`
      <railz-bank-reconciliation>
         <mock:shadow-root>  
          <railz-error-image statuscode="404"></railz-error-image>
         </mock:shadow-root>
      </railz-bank-reconciliation>
    `);
  });
});

// yarn test packages/components/src/elements/bank-reconciliation/test/bank-reconciliation.spec.tsx
