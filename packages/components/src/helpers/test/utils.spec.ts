import {
  formatDate,
  getTitleByReportType,
  formatSeries,
  formatNumber,
  isStatements,
  isTransactions,
  isRequiredReportFrequency,
  fromCssObjectToInline,
} from '../utils';
import Translations from '../../config/translations/en.json';
import { RVBalanceSheetSummary, RVReportFrequency, RVReportTypes } from '../../types';

import { mockMonth1, mockMonth2 } from './mock-constants';

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
          Translations.RV_INCOME_STATEMENTS,
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
        expect(formatDate([mockMonth1], RVReportFrequency.MONTH)).toEqual(['Jan 16']);
      });

      test('returns month to Report Frequency month.', async () => {
        const balanceSheetSummaries: RVBalanceSheetSummary[] = [mockMonth1, mockMonth2];
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
        expect(formatSeries([mockMonth1, mockMonth2], 'name', 'assets')).toEqual({
          data: [123, 123],
          name: 'name',
        });
      });
      test('returns equity data to correct params', async () => {
        expect(formatSeries([mockMonth1, mockMonth2], 'name', 'equity')).toEqual({
          data: [456, 456],
          name: 'name',
        });
      });
    });
  });

  describe('formatNumber', () => {
    describe('null values', () => {
      test('returns empty when sent null values', async () => {
        expect(formatNumber(null, null)).toEqual('');
      });
    });
    describe('happy day', () => {
      test('returns number on the correct format', async () => {
        expect(formatNumber(100.223, 3, 1)).toEqual('100.223');
        expect(formatNumber(100.223, 3, 2)).toEqual('100.223');
        expect(formatNumber(100.223, 2, 2)).toEqual('100.22');
        expect(formatNumber(100.22, 2, 2)).toEqual('100.22');
        expect(formatNumber(1000000, 2, 2)).toEqual('1,000,000.00');
        expect(formatNumber(1000000, 2)).toEqual('1,000,000');
        expect(formatNumber(1000000, 4)).toEqual('1,000,000');
        expect(formatNumber(1000000)).toEqual('1,000,000');
        expect(formatNumber(1)).toEqual('1');
        expect(formatNumber(-1000)).toEqual('-1,000');
        expect(formatNumber(-100000000)).toEqual('-100,000,000');
        expect(formatNumber(1000.999, 1)).toEqual('1,001');
        expect(formatNumber(1000.123, 2)).toEqual('1,000.12');
        expect(formatNumber(1000.1, 4)).toEqual('1,000.1');
        expect(formatNumber(123.000001, 5)).toEqual('123');
        expect(formatNumber(123.00001, 5)).toEqual('123.00001');
        expect(formatNumber(0.1)).toEqual('0.1');
        expect(formatNumber(-100000000.123, 3)).toEqual('-100,000,000.123');
      });
    });
  });

  describe('isStatements', () => {
    describe('null values', () => {
      test('returns empty when sent null values', async () => {
        expect(isStatements(null)).toEqual(null);
      });
    });
    describe('happy day', () => {
      test('returns false for type that is statement', async () => {
        expect(isStatements(RVReportTypes.BALANCE_SHEET)).toEqual(true);
        expect(isStatements(RVReportTypes.INCOME_STATEMENTS)).toEqual(true);
        expect(isStatements(RVReportTypes.CASHFLOW_STATEMENTS)).toEqual(true);
      });

      test('returns false for type that is not statement', async () => {
        expect(isStatements(RVReportTypes.BANK_ACCOUNT)).toEqual(false);
        expect(isStatements(RVReportTypes.BILLS)).toEqual(false);
        expect(isStatements(RVReportTypes.CREDIT_SCORE)).toEqual(false);
        expect(isStatements(RVReportTypes.EXPENSES)).toEqual(false);
        expect(isStatements(RVReportTypes.FINANCIAL_RATIO)).toEqual(false);
        expect(isStatements(RVReportTypes.INVOICES)).toEqual(false);
        expect(isStatements(RVReportTypes.REVENUE)).toEqual(false);
      });
    });
  });

  describe('isTransactions', () => {
    describe('null values', () => {
      test('returns empty when sent null values', async () => {
        expect(isTransactions(null)).toEqual(null);
      });
    });
    describe('happy day', () => {
      test('returns false for type that is transactions', async () => {
        expect(isTransactions(RVReportTypes.INVOICES)).toEqual(true);
        expect(isTransactions(RVReportTypes.BILLS)).toEqual(true);
      });

      test('returns false for type that is not transactions', async () => {
        expect(isTransactions(RVReportTypes.BALANCE_SHEET)).toEqual(false);
        expect(isTransactions(RVReportTypes.INCOME_STATEMENTS)).toEqual(false);
        expect(isTransactions(RVReportTypes.CASHFLOW_STATEMENTS)).toEqual(false);
        expect(isTransactions(RVReportTypes.BANK_ACCOUNT)).toEqual(false);
        expect(isTransactions(RVReportTypes.CREDIT_SCORE)).toEqual(false);
        expect(isTransactions(RVReportTypes.EXPENSES)).toEqual(false);
        expect(isTransactions(RVReportTypes.FINANCIAL_RATIO)).toEqual(false);
        expect(isTransactions(RVReportTypes.REVENUE)).toEqual(false);
      });
    });
  });

  describe('getTitleByReportType', () => {
    describe('null values', () => {
      test('returns empty when sent null values', async () => {
        expect(getTitleByReportType(null)).toEqual('');
      });
    });
    describe('happy day', () => {
      test('returns translated title for type', async () => {
        expect(getTitleByReportType(RVReportTypes.INVOICES)).toEqual(Translations.RV_INVOICES);
        expect(getTitleByReportType(RVReportTypes.BILLS)).toEqual(Translations.RV_BILLS);
        expect(getTitleByReportType(RVReportTypes.BALANCE_SHEET)).toEqual(
          Translations.RV_BALANCE_SHEET,
        );
        expect(getTitleByReportType(RVReportTypes.INCOME_STATEMENTS)).toEqual(
          Translations.RV_INCOME_STATEMENTS,
        );
        expect(getTitleByReportType(RVReportTypes.CASHFLOW_STATEMENTS)).toEqual(
          Translations.RV_CASHFLOW_STATEMENTS,
        );
      });
    });
  });

  describe('isRequiredReportFrequency', () => {
    describe('null values', () => {
      test('returns empty when sent null values', async () => {
        expect(isRequiredReportFrequency(null)).toEqual(null);
      });
    });
    describe('happy day', () => {
      test('returns false for type that is required to have report frequency', async () => {
        expect(isRequiredReportFrequency(RVReportTypes.REVENUE)).toEqual(true);
        expect(isRequiredReportFrequency(RVReportTypes.EXPENSES)).toEqual(true);
        expect(isRequiredReportFrequency(RVReportTypes.CASHFLOW_STATEMENTS)).toEqual(true);
        expect(isRequiredReportFrequency(RVReportTypes.BALANCE_SHEET)).toEqual(true);
        expect(isRequiredReportFrequency(RVReportTypes.INCOME_STATEMENTS)).toEqual(true);
        expect(isRequiredReportFrequency(RVReportTypes.FINANCIAL_RATIO)).toEqual(true);
      });

      test('returns false for type that is not required to have report frequency', async () => {
        expect(isRequiredReportFrequency(RVReportTypes.BANK_ACCOUNT)).toEqual(false);
        expect(isRequiredReportFrequency(RVReportTypes.BILLS)).toEqual(false);
        expect(isRequiredReportFrequency(RVReportTypes.CREDIT_SCORE)).toEqual(false);
        expect(isRequiredReportFrequency(RVReportTypes.INVOICES)).toEqual(false);
      });
    });
  });
  describe('camelCase to comma styling', () => {
    test('happy path', async () => {
      const expected = 'color: red;background-color: blue';
      const actual = fromCssObjectToInline({ color: 'red', backgroundColor: 'blue' });
      expect(actual).toEqual(expected);
    });

    test('ignored objects', async () => {
      const expected = 'color: red';
      const actual = fromCssObjectToInline({ color: 'red', backgroundColor: { color: 'blue' } });
      expect(actual).toEqual(expected);
    });
    test('empty object', async () => {
      const expected = '';
      const actual = fromCssObjectToInline({});
      expect(actual).toEqual(expected);
    });
  });
});
