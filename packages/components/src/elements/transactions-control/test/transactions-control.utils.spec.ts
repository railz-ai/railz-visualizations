import { RequestServiceInstance } from '../../../services/request';
import {
  RVAccountingProviders,
  RVReportFrequency,
  RVReportRequestParameter,
  RVReportTypes,
} from '../../../types';
import { getReportData } from '../transactions-control.utils';

const mockFetchResult = {
  data: {
    unpaidAmount: 34342.5,
    paidAmount: 1318,
    overdueAmount: 34342.5,
  },
};

describe('Transactions Chart Utils', () => {
  describe('getTransactionsData', () => {
    describe('success path', () => {
      test('returns transaction data when sending correct params', async () => {
        jest
          .spyOn(RequestServiceInstance, 'getReportData')
          .mockImplementation(() => Promise.resolve(mockFetchResult));

        const reportRequestDateParameter: RVReportRequestParameter = {
          filter: {
            reportType: RVReportTypes.INVOICES,
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            businessName: 'businessName',
            connectionId: '',
            reportFrequency: RVReportFrequency.MONTH,
          },
        };
        expect(getReportData(reportRequestDateParameter)).resolves.toEqual(mockFetchResult);
      });
    });
  });
});

// yarn test packages/components/src/elements/transactions-control/test/transactions-control.utils.spec.ts
