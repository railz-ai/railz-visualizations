import { RVAccountingProviders, RVReportRequestDateParameter, RVReportTypes } from '../../../types';
import { getTransactionsData } from '../transactions-control.utils';

const mockFetchResult = { data: [1, 2, 3] };
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockFetchResult),
  }),
);

describe('Statements Chart Utils', () => {
  describe('getTransactionsData', () => {
    describe('failture path', () => {
      test('it fails when sending wrong date', async () => {
        const reportRequestDateParameter: RVReportRequestDateParameter = {
          filter: {
            reportType: RVReportTypes.INVOICES,
            startDate: '2020-01-0',
            endDate: '2021-01-01',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            businessName: 'businessName',
          },
        };

        expect(getTransactionsData(reportRequestDateParameter)).resolves.toEqual({
          error: new RangeError('Invalid time value'),
        });
      });
    });
    describe('success path', () => {
      test('returns transaction data when sending correct params', async () => {
        const reportRequestDateParameter: RVReportRequestDateParameter = {
          filter: {
            reportType: RVReportTypes.INVOICES,
            startDate: '2020-01-01',
            endDate: '2021-01-01',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            businessName: 'businessName',
          },
        };
        expect(getTransactionsData(reportRequestDateParameter)).resolves.toEqual(mockFetchResult);
      });
    });
  });
});
