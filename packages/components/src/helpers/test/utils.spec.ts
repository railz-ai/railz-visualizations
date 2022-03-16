import { formatDate, getTitleByReportType, formatSeries } from '../utils';
import Translations from '../../config/translations/en.json';
import { RVBalanceSheetSummary, RVReportFrequency, RVReportTypes } from '../../types';

const month1: RVBalanceSheetSummary = {
  period: {
    date: '2016-01-01',
    day: 15,
    month: 3,
    quarter: 1,
    year: 2022,
  },
  assets: 123,
  equity: 456,
  liabilities: 789,
};

const month2: RVBalanceSheetSummary = {
  period: {
    date: '2016-02-01',
    day: 15,
    month: 3,
    quarter: 1,
    year: 2022,
  },
  assets: 123,
  equity: 456,
  liabilities: 789,
};

describe('Utils Helper Tests', () => {
  describe('getTitleByReportType', () => {
    describe('failure path', () => {
      test('returns empty due to unknown report type', async () => {
        expect(getTitleByReportType('balance' as unknown as RVReportTypes)).toEqual('');
      });
    });
    describe('success path', () => {
      test('returns value with correct report type', async () => {
        expect(getTitleByReportType(RVReportTypes.INCOME_STATEMENTS)).toEqual(
          Translations.INCOME_STATEMENTS,
        );
      });
    });
  });

  describe('formatDate', () => {
    describe('null values', () => {
      test('returns undefined to null values', async () => {
        expect(formatDate(null, null)).toBeUndefined();
      });
    });
    describe('happy day', () => {
      test('returns year to Report Frequency year.', async () => {
        const balanceSheetSummary: RVBalanceSheetSummary = {
          period: {
            date: 1647370885,
            day: 15,
            month: 3,
            quarter: 1,
            year: 2022,
          },
          assets: 123,
          equity: 456,
          liabilities: 789,
        };
        expect(formatDate([balanceSheetSummary], RVReportFrequency.YEAR)).toEqual(['2022']);
      });
      test('returns month to Report Frequency month.', async () => {
        expect(formatDate([month1], RVReportFrequency.MONTH)).toEqual(['Jan 16']);
      });

      test('returns month to Report Frequency month.', async () => {
        const balanceSheetSummaries: RVBalanceSheetSummary[] = [month1, month2];
        expect(formatDate(balanceSheetSummaries, RVReportFrequency.MONTH)).toEqual([
          'Jan 16',
          'Feb 16',
        ]);
      });
    });
  });

  describe('formatSeries', () => {
    describe('null values', () => {
      test('returns object empty values when sent null values', async () => {
        expect(formatSeries(null, null, null)).toEqual({ data: undefined, name: null });
      });
    });
    describe('happy day', () => {
      test('returns assets data to correct params', async () => {
        expect(formatSeries([month1, month2], 'name', 'assets')).toEqual({
          data: [123, 123],
          name: 'name',
        });
      });
      test('returns equity data to correct params', async () => {
        expect(formatSeries([month1, month2], 'name', 'equity')).toEqual({
          data: [456, 456],
          name: 'name',
        });
      });
    });
  });
});
