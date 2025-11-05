import { isNil, invert } from 'lodash-es';
import { parseISO, format } from 'date-fns';
import * as locales from 'date-fns/locale';

import numbro from 'numbro';

import Translations from '../config/translations/en.json';
import { RVReportTypes } from '../types/enum/report-type';
import { RVFormat, RVReportFrequency, RVReportStatementSummary } from '../types';
import { errorLog } from '../services/logger';

/**
 * Format date that will be shown on charts and show short form
 */
export const formatDate = (
  summary: RVReportStatementSummary,
  reportFrequency: RVReportFrequency,
  dateFormat?: RVFormat,
): string[] => {
  return summary?.map((data) => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter')
      return `${dateFormat?.prefix || 'Q'}${data.period.quarter} ${format(
        date,
        dateFormat?.format || 'yyyy',
      )}`;
    if (reportFrequency === 'year')
      return format(new Date(data.period.year, 1, 1), dateFormat?.format || 'yyyy', {
        // eslint-disable-next-line import/namespace
        locale: locales[dateFormat?.locale || 'us'],
      });
    return format(date, dateFormat?.format || 'MMM yy', {
      // eslint-disable-next-line import/namespace
      locale: locales[dateFormat?.locale || 'us'],
    });
  });
};

export const formatNegativeValues = (name: string, value: number): any => {
  if (['currentLiabilities', 'nonCurrentLiabilities'].includes(name)) {
    return value > 0 ? value * -1 : value;
  }
  return value;
};

/**
 * Filter data to ensure there is no undefined field result
 */
export const formatSeries = (
  summary: RVReportStatementSummary,
  name: string,
  field: string,
): { name: string; data: RVReportStatementSummary } => ({
  name,
  data: summary
    ?.map((data: { [x: string]: any }) => data[field])
    .filter((data) => data !== undefined)
    ?.map((item: any) => formatNegativeValues(field, item)),
});

/**
 * Format number displayed on UI to 2 decimals and thousand separator
 */
export const formatNumber = (number: number | string, decimals = 2, minimum = 0): string => {
  if (!isNil(number)) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minimum,
      maximumFractionDigits: decimals,
    });
    return formatter.format(Number(number));
  }
  return '';
};

const formatCurrencyNumber = (value: number, decimals = 2): string => {
  if (isNil(value)) return '';
  return numbro(Number(value)).format(`0,000.${'0'.repeat(decimals)}`);
};

export const formatCurrencyValue = (value: number, decimals = 2, fallbackValue = '-'): string => {
  const formattedValue = formatCurrencyNumber(value, decimals);
  return ['', 'NaN'].includes(formattedValue) ? fallbackValue : '$' + formattedValue;
};

/**
 * Determine if report type is table
 */
export const isBankAccounts = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.BANK_ACCOUNT].includes(reportType);
};
/**
 * Determine if report type is financialRatios
 */
export const isFinancialRatios = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.FINANCIAL_RATIO].includes(reportType);
};

/**
 * Determine if report type is gauge
 */
export const isCreditScore = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.CREDIT_SCORE].includes(reportType);
};

/**
 * Determine if report type is bank reconciliation
 */
export const isBankReconciliation = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.BANK_RECONCILIATION].includes(reportType);
};

/**
 * Determine if report type is business valuations
 */
export const isBusinessValuations = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.BUSINESS_VALUATIONS].includes(reportType);
};

/**
 * Determine if report type is Tax Benchmarking
 */
export const isTaxBenchmarking = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.TAX_BENCHMARKING].includes(reportType);
};

/**
 * Determine if report type is pie
 */
export const isIncomeStatements = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.EXPENSES, RVReportTypes.REVENUE].includes(reportType);
};

/**
 * Determine if report type is financial statements
 */
export const isStatements = (reportType: RVReportTypes): boolean => {
  return (
    reportType &&
    [
      RVReportTypes.BALANCE_SHEET,
      RVReportTypes.INCOME_STATEMENTS,
      RVReportTypes.CASHFLOW_STATEMENTS,
      RVReportTypes.FINANCIAL_FORECASTS,
    ].includes(reportType)
  );
};

/**
 * Determine if report type is transactional
 */
export const isTransactions = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.INVOICES, RVReportTypes.BILLS].includes(reportType);
};

/**
 * Get title of report types to be displayed on the box
 */
export const getTitleByReportType = (reportType: RVReportTypes): string => {
  const mappingReportTypeTranslation = invert(RVReportTypes);
  return Translations[`RV_${mappingReportTypeTranslation[reportType]}`] || '';
};

/**
 * Get information about reports with report frequency
 */
export const isRequiredReportFrequency = (reportType: RVReportTypes): boolean => {
  return (
    reportType &&
    [
      RVReportTypes.REVENUE,
      RVReportTypes.EXPENSES,
      RVReportTypes.CASHFLOW_STATEMENTS,
      RVReportTypes.BALANCE_SHEET,
      RVReportTypes.INCOME_STATEMENTS,
      RVReportTypes.FINANCIAL_RATIO,
    ].includes(reportType)
  );
};

/**
 * Get information about reports with accounting method
 */
export const isRequiredAccountingMethod = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.BALANCE_SHEET].includes(reportType);
};

/**
 * Round number and format to display
 */
export const roundNumber = (number: number, mantissa = 2): string => {
  if (!isNil(number)) {
    return numbro(Number(number))
      .format({
        average: true,
        mantissa,
        optionalMantissa: true,
        lowPrecision: false,
      })
      ?.toUpperCase();
  }
  return '';
};

/**
 * return an inline styling string based on a css styling object,
 *  taking in consideration only stirng or number styling values.
 */
export const fromCssObjectToInline = (cssObject?: { [key: string]: any }): string => {
  if (!cssObject) return '';
  return Object.entries(cssObject)
    .filter(([key, value]) => key && (typeof value === 'string' || typeof value === 'number'))
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}: ${value}`)
    .join(';');
};

export const handleError = (responseData: { [key: string]: any }): number => {
  let errorStatusCode;
  if (responseData?.status === 202) {
    errorLog(Translations.RV_ERROR_202_TITLE);
    errorStatusCode = 202;
  } else if (
    responseData?.error?.message[0] === 'Combination of service and report type is not supported' ||
    responseData?.error?.statusCode === 404
  ) {
    errorLog(Translations.DASHBOARD_FINANCIAL_SUMMARY_CHART_ERROR_ASP_NOT_SUPPORTED);
    errorStatusCode = 404;
  } else if (
    responseData?.error?.message[0] === 'Service provider not supported' ||
    responseData?.error?.statusCode === 400
  ) {
    errorLog(Translations.DASHBOARD_FINANCIAL_SUMMARY_CHART_ERROR_ASP_NOT_SUPPORTED);
    errorStatusCode = 404;
  } else if (responseData?.error?.statusCode === 500) {
    errorLog(Translations.RV_ERROR_500_TITLE);
    errorStatusCode = 500;
  } else {
    // generic error response
    errorLog(Translations.RV_ERROR_204_TITLE);
    errorStatusCode = 204;
  }

  return errorStatusCode;
};
