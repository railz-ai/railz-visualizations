import { isNil } from 'lodash-es';
import { parseISO, format } from 'date-fns';

import numbro from 'numbro';

import Translations from '../config/translations/en.json';
import { RVReportTypes } from '../types/enum/report-type';
import { RVReportFrequency, RVReportStatementSummary } from '../types';

/**
 * Format date that will be shown on charts and show short form
 */
export const formatDate = (
  summary: RVReportStatementSummary,
  reportFrequency: RVReportFrequency,
): string[] => {
  return summary?.map((data) => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter') return `Q${data.period.quarter} ${format(date, 'yyyy')}`;
    if (reportFrequency === 'year') return data.period.year.toString();
    return format(date, 'MMM yy');
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
  data: summary?.map((data) => data[field]).filter((data) => data != undefined),
});

/**
 * Format number displayed on UI to 2 decimals and thousand seperator
 */
export const formatNumber = (number: number | string, decimals = 2): string => {
  if (!isNil(number)) {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
    });
    return formatter.format(Number(number));
  }
  return '';
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
  switch (reportType) {
    case RVReportTypes.INVOICES:
      return Translations.RV_INVOICES;
    case RVReportTypes.BILLS:
      return Translations.RV_BILLS;
    case RVReportTypes.BALANCE_SHEET:
      return Translations.RV_BALANCE_SHEETS;
    case RVReportTypes.INCOME_STATEMENTS:
      return Translations.INCOME_STATEMENTS;
    case RVReportTypes.CASHFLOW_STATEMENTS:
      return Translations.CASHFLOW_STATEMENTS;
    case RVReportTypes.EXPENSES:
      return Translations.EXPENSES;
    case RVReportTypes.REVENUE:
      return Translations.REVENUE;
    case RVReportTypes.RAILZ_SCORE:
      return Translations.RAILZ_SCORE;
    case RVReportTypes.FINANCIAL_RATIO:
      return Translations.FINANCIAL_RATIOS;
    default:
      return '';
  }
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
