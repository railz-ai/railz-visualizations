import { isNil } from 'lodash';
import numbro from 'numbro';
import { parseISO, format } from 'date-fns';
import Translations from '../config/translations/en.json';
import {RVReportTypes} from "../types/enum/report-type";

export const formatDate = (summary, reportFrequency): string[] => {
  return summary.map(data => {
    const date = parseISO(data.period.date);
    if (reportFrequency === 'quarter') return `Q${data.period.quarter} ${format(date, 'YYYY')}`;
    if (reportFrequency === 'year') return data.period.year.toString();
    return format(date, 'MMM yy');
  });
};

export const formatSeries = (summary, name, field): { name: string; data: [] } => ({
  name,
  data: summary.map(data => data[field]).filter(data => data != undefined),
});

export const formatNumber = (number: number, decimals = 2): string => {
  if (!isNil(number)) {
    return numbro(Number(number)).format(`0,000.${'0'.repeat(decimals)}`);
  }
  return '';
};

export const isStatements = (reportType: RVReportTypes) => {
  return reportType && [RVReportTypes.BALANCE_SHEET, RVReportTypes.INCOME_STATEMENTS, RVReportTypes.CASHFLOW_STATEMENTS].includes(reportType);
};

export const isTransactions = (reportType: RVReportTypes) => {
  return reportType && [RVReportTypes.INVOICES, RVReportTypes.BILLS].includes(reportType);
};

export const getTitleByReportType = (reportType: RVReportTypes) => {
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
