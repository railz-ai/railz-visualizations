import { mockMonth1, mockMonth2 } from '../../../helpers/test/mock-constants';
import {
  RVAccountingProviders,
  RVChartStatementBaseParameter,
  RVChartStatementParameter,
  RVFilterBalanceSheet,
  RVFilterStatements,
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
          colors: ['#009BBD', '#F06C3A', '#003032', '#000000'],
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
          colors: ['#009BBD', '#F06C3A', '#003032', '#000000'],
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
          colors: ['#1D7043', '#F06C3A', '#30A665', '#B30000', '#000000'],
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
          colors: ['#1D7043', '#F06C3A', '#30A665', '#B30000', '#000000'],
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
          colors: ['#006037', '#F06C3A', '#B30000', '#003032', '#38C076', '#000000'],
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
          colors: ['#006037', '#F06C3A', '#B30000', '#003032', '#38C076', '#000000'],
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
          colors: ['#1D7043', '#F06C3A', '#30A665', '#B30000', '#000000'],
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
          colors: ['#1D7043', '#F06C3A', '#30A665', '#B30000', '#000000'],
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
        const filterStatements: RVFilterStatements = {
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          reportType: RVReportTypes.BALANCE_SHEET,
          startDate: '2020-01-01',
          endDate: '2021-01-01',
        };
        expect(shouldAddReconstructParam(filterStatements)).toEqual(true);
      });
      test('returns formatted data to correct sent data for month', async () => {
        const filterBalanceSheet: RVFilterBalanceSheet = {
          businessName: 'businessName',
          serviceName: RVAccountingProviders.ORACLE_NETSUITE,
          reportFrequency: RVReportFrequency.MONTH,
          reportType: RVReportTypes.BALANCE_SHEET,
          startDate: '2020-01-01',
          endDate: '2021-01-01',
        };
        expect(shouldAddReconstructParam(filterBalanceSheet)).toEqual(false);
      });
    });
  });
});

// yarn test packages/components/src/elements/statements-chart/test/statements-chart.utils.spec.ts
