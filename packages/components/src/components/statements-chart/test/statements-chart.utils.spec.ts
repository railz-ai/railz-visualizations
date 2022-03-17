import { mockMonth1, mockMonth2 } from '../../../helpers/test/mock-constants';
import {
  RVAccountingProviders,
  RVBaseFilterBusinessDateFrequencyType,
  RVChartStatementBaseParameter,
  RVChartStatementParameter,
  RVReportFrequency,
  RVReportTypes,
} from '../../../types';
import {
  formatBalanceSheetData,
  formatCashflowData,
  formatData,
  formatIncomeStatementData,
  shouldAddReconstructParam,
} from '../statements-chart.utils';

describe('Statements Chart Utils', () => {
  describe('formatCashflowData', () => {
    describe('success path', () => {
      test('returns formatted cashFlow to correct sent data for month', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.MONTH,
          chart: {},
        };
        expect(formatCashflowData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['Jan 16', 'Feb 16'],
          colors: ['#389BFF', '#FFD738', '#1D7043', '#003032'],
          series: [],
        });
      });

      test('returns formatted cashFlow to correct sent data for year', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.YEAR,
          chart: {},
        };
        expect(formatCashflowData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['2022', '2022'],
          colors: ['#389BFF', '#FFD738', '#1D7043', '#003032'],
          series: [],
        });
      });
    });
  });

  describe('formatBalanceSheetData', () => {
    describe('success path', () => {
      test('returns formatted balanceSheets to correct sent data for month', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.MONTH,
          chart: {},
        };
        expect(formatBalanceSheetData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['Jan 16', 'Feb 16'],
          colors: ['#1D7043', '#30A665', '#F06C3A', '#B30000', '#003032'],
          series: [
            {
              data: [456, 456],
              enableMouseTracking: false,
              marker: { enabled: false },
              name: 'Equity',
              states: { hover: { lineWidth: 0 } },
              type: 'spline',
            },
          ],
        });
      });

      test('returns formatted balanceSheets to correct sent data for year', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.YEAR,
          chart: {},
        };
        expect(formatBalanceSheetData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['2022', '2022'],
          colors: ['#1D7043', '#30A665', '#F06C3A', '#B30000', '#003032'],
          series: [
            {
              data: [456, 456],
              enableMouseTracking: false,
              marker: { enabled: false },
              name: 'Equity',
              states: { hover: { lineWidth: 0 } },
              type: 'spline',
            },
          ],
        });
      });
    });
  });

  describe('formatIncomeStatementData', () => {
    describe('success path', () => {
      test('returns formatted incomeStatement to correct sent data for month', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.MONTH,
          chart: {},
        };
        expect(formatIncomeStatementData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['Jan 16', 'Feb 16'],
          colors: ['#1D7043', '#FF804F', '#009BBD', '#BCEDD2', '#38C076', '#003032'],
          series: [],
        });
      });

      test('returns formatted incomeStatement to correct sent data for year', async () => {
        const chartStatementBaseParameter: RVChartStatementBaseParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.YEAR,
          chart: {},
        };
        expect(formatIncomeStatementData(chartStatementBaseParameter)).toStrictEqual({
          categories: ['2022', '2022'],
          colors: ['#1D7043', '#FF804F', '#009BBD', '#BCEDD2', '#38C076', '#003032'],
          series: [],
        });
      });
    });
  });

  describe('formatData', () => {
    describe('success path', () => {
      test('returns formatted data to correct sent data for month', async () => {
        const chartStatementParameter: RVChartStatementParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.MONTH,
          chart: {},
          reportType: RVReportTypes.BALANCE_SHEET,
        };
        expect(formatData(chartStatementParameter)).toStrictEqual({
          categories: ['Jan 16', 'Feb 16'],
          colors: ['#1D7043', '#30A665', '#F06C3A', '#B30000', '#003032'],
          series: [
            {
              data: [456, 456],
              enableMouseTracking: false,
              marker: { enabled: false },
              name: 'Equity',
              states: { hover: { lineWidth: 0 } },
              type: 'spline',
            },
          ],
        });
      });

      test('returns formatted data to correct sent data for year', async () => {
        const chartStatementParameter: RVChartStatementParameter = {
          summary: [mockMonth1, mockMonth2],
          reportFrequency: RVReportFrequency.YEAR,
          chart: {},
          reportType: RVReportTypes.BALANCE_SHEET,
        };
        expect(formatData(chartStatementParameter)).toStrictEqual({
          categories: ['2022', '2022'],
          colors: ['#1D7043', '#30A665', '#F06C3A', '#B30000', '#003032'],
          series: [
            {
              data: [456, 456],
              enableMouseTracking: false,
              marker: { enabled: false },
              name: 'Equity',
              states: { hover: { lineWidth: 0 } },
              type: 'spline',
            },
          ],
        });
      });
    });
  });

  describe('shouldAddReconstructParam', () => {
    describe('success path', () => {
      test('returns formatted data to correct sent data for month', async () => {
        const baseFilterBusinessDateFrequencyType: RVBaseFilterBusinessDateFrequencyType = {
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          reportType: RVReportTypes.BALANCE_SHEET,
          startDate: '2020-01-01',
          endDate: '2021-01-01',
        };
        expect(shouldAddReconstructParam(baseFilterBusinessDateFrequencyType)).toEqual(true);
      });
      test('returns formatted data to correct sent data for month', async () => {
        const baseFilterBusinessDateFrequencyType: RVBaseFilterBusinessDateFrequencyType = {
          businessName: 'businessName',
          serviceName: RVAccountingProviders.ORACLE_NETSUITE,
          reportFrequency: RVReportFrequency.MONTH,
          reportType: RVReportTypes.BALANCE_SHEET,
          startDate: '2020-01-01',
          endDate: '2021-01-01',
        };
        expect(shouldAddReconstructParam(baseFilterBusinessDateFrequencyType)).toEqual(false);
      });
    });
  });
});
