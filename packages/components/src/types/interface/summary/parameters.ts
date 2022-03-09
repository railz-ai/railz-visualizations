import { RVReportFrequency } from '../../enum/date';
import { RVFinancialStatementsTypes, RVReportTypes } from '../../enum/report-type';

import { RVOptions, RVOptionsChartStyle } from '../option';
import { RVBaseAllFilter, RVFilterDate, RVFilterFrequency } from '../filter';

import { RVFormattedStatementData } from './formatted-data';
import { RVBillInvoiceSummary, RVReportStatementSummary } from './api-response';

export interface RVChartStatementBaseParameter {
  summary: RVReportStatementSummary;
  reportFrequency: RVReportFrequency;
  chart: RVOptionsChartStyle;
}

export interface RVChartStatementParameter extends RVChartStatementBaseParameter {
  reportType: RVFinancialStatementsTypes;
}

export interface RVChartTransactionsBaseParameter {
  summary: RVBillInvoiceSummary;
  colors: string[];
}

export interface RVChartTransactionsParameter extends RVChartTransactionsBaseParameter {
  reportType: RVFinancialStatementsTypes;
}

export interface RVUpdateChartParameter {
  containerRef?: HTMLDivElement;
  dataFormatted: RVFormattedStatementData;
  options: RVOptions;
}

export interface RVChartOptionsParameter extends RVFormattedStatementData {
  chart: RVOptionsChartStyle;
}

export interface RVReportRequestParameter {
  filter: RVFilterFrequency;
}
export interface RVReportRequestDateParameter {
  filter: RVFilterDate;
}

export interface RVReportDataRequest {
  reportType: RVReportTypes;
  filter: RVBaseAllFilter;
}

export interface RVReportRequest {
  url: string;
}
