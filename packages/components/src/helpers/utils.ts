import { isNil } from 'lodash-es';
import { parseISO, format } from 'date-fns';

import Translations from '../config/translations/en.json';
import { RVReportTypes } from '../types/enum/report-type';
import { RVReportFrequency, RVReportStatementSummary } from '../types';

export const formatDate = (summary: RVReportStatementSummary, reportFrequency: RVReportFrequency): string[] => {
  return summary.map(data => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter') return `Q${data.period.quarter} ${format(date, 'YYYY')}`;
    if (reportFrequency === 'year') return data.period.year.toString();
    return format(date, 'MMM yy');
  });
};

export const formatSeries = (summary: RVReportStatementSummary, name: string, field: string): { name: string; data: RVReportStatementSummary } => ({
  name,
  data: summary.map(data => data[field]).filter(data => data != undefined),
});

export const formatNumber = (number: number, decimals = 2): string => {
  if (!isNil(number)) {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
    });
    return formatter.format(Number(number));
  }
  return '';
};

export const isStatements = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.BALANCE_SHEET, RVReportTypes.INCOME_STATEMENTS, RVReportTypes.CASHFLOW_STATEMENTS].includes(reportType);
};

export const isTransactions = (reportType: RVReportTypes): boolean => {
  return reportType && [RVReportTypes.INVOICES, RVReportTypes.BILLS].includes(reportType);
};

export const getTitleByReportType = (reportType: RVReportTypes): string => {
  switch (reportType) {
    case RVReportTypes.INVOICES:
      return Translations.INVOICES;
    case RVReportTypes.BILLS:
      return Translations.BILLS;
    case RVReportTypes.BALANCE_SHEET:
      return Translations.BALANCE_SHEETS;
    case RVReportTypes.INCOME_STATEMENTS:
      return Translations.INCOME_STATEMENTS;
    case RVReportTypes.CASHFLOW_STATEMENTS:
      return Translations.CASHFLOW_STATEMENTS;
    default:
      return '';
  }
};
