import { RVAccountingProviders, RVReportRequestDateParameter, RVReportTypes } from '../../../types';
import { getReportData } from '../gauge-chart.utils';

const mockFetchResult = {
  data: {
    score: 548,
    rating: 'Poor',
    lastUpdated: '2022-03-27',
  },
};
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockFetchResult),
  }),
);

describe('Gauge Chart Utils', () => {
  describe('getReportData', () => {
    describe('success path', () => {
      test('getting results to correct request', async () => {
        const params: RVReportRequestDateParameter = {
          filter: {
            businessName: 'qbostyling',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            reportType: RVReportTypes.SCORE,
            startDate: '2021-01-01',
            endDate: '2022-01-31',
          },
        };
        const result = {
          data: {
            score: 548,
            rating: 'Poor',
            lastUpdated: '2022-03-27',
          },
        };

        expect(getReportData(params)).resolves.toEqual(result);
      });
    });
  });
});
