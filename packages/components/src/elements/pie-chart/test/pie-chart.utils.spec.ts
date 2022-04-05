import {
  RVAccountingProviders,
  RVReportFrequency,
  RVReportRequestDateParameter,
  RVReportTypes,
} from '../../../types';
import { getReportData } from '../pie-chart.utils';

const params: RVReportRequestDateParameter = {
  filter: {
    businessName: 'qbostyling',
    serviceName: RVAccountingProviders.QUICKBOOKS,
    reportType: RVReportTypes.REVENUE,
    startDate: '2021-01-01',
    endDate: '2022-01-31',
    reportFrequency: RVReportFrequency.MONTH,
  },
};

describe('Pie Chart Utils', () => {
  describe('getReportData', () => {
    describe('success path', () => {
      const mockFetchResult = {
        data: {
          percentageChange: -100.36,
          previousAmount: 28025.78,
          subSections: [
            {
              amount: 143814.48,
              name: 'Income',
            },
            {
              amount: 0,
              name: 'Other',
            },
          ],
          totalAmount: 143814.48,
        },
      };
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(mockFetchResult),
          }),
        );
      });
      test('getting results to correct request', async () => {
        expect(getReportData(params)).resolves.toEqual(mockFetchResult);
      });
    });
    describe('failure path', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.reject(),
          }),
        );
      });
      test('getting results to correct request', async () => {
        const result = {
          error: undefined,
        };

        expect(getReportData(params)).resolves.toEqual(result);
      });
    });
  });
});
