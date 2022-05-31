import { isNil, invert } from 'lodash-es';
import { parseISO, format } from 'date-fns';
import * as locales from 'date-fns/locale';

import numbro from 'numbro';

import Translations from '../config/translations/en.json';
import { RVReportTypes } from '../types/enum/report-type';
import { RVMonth, RVReportFrequency, RVReportStatementSummary } from '../types';

/**
 * Format date that will be shown on charts and show short form
 */
export const formatDate = (
  summary: RVReportStatementSummary,
  reportFrequency: RVReportFrequency,
  quarter = 'Q',
  month: RVMonth,
): string[] => {
  return summary?.map((data) => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter')
      return `${quarter}${data.period.quarter} ${format(date, 'yyyy')}`;
    if (reportFrequency === 'year') return data.period.year.toString();
    // eslint-disable-next-line import/namespace
    return format(date, month.format || 'MMM yy', { locale: locales[month.locale || 'us'] });
  });
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
    .filter((data) => data != undefined),
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

/**
 * Determine if report type is bankAccounts
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
export const isGauge = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.RAILZ_SCORE].includes(reportType);
};

/**
 * Determine if report type is pie
 */
export const isPie = (reportType: RVReportTypes): boolean => {
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
