import { RVAccountingProviders, RVReportRequestDateParameter, RVReportTypes } from '../../../types';
import { getReportData } from '../gauge-chart.utils';

const params: RVReportRequestDateParameter = {
  filter: {
    businessName: 'qbostyling',
    serviceName: RVAccountingProviders.QUICKBOOKS,
    reportType: RVReportTypes.RAILZ_SCORE,
    startDate: '2021-01-01',
    endDate: '2022-01-31',
  },
};

describe('Gauge Chart Utils', () => {
  describe('getReportData', () => {
    describe('success path', () => {
      const mockFetchResult = {
        data: {
          score: 548,
          rating: 'Poor',
          lastUpdated: '2022-03-27',
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
