import { RVReportFrequency } from '../../enum/date';
import { RVFinancialStatementsTypes } from '../../enum/report-type';
import { RVOptions, RVOptionsChartStyle } from '../option';
import { RVFilterAll } from '../filter';
import { RVMonths } from '../content';

import { RVFormattedStatementData } from './formatted-data';
import { RVBillInvoiceSummary, RVReportStatementSummary } from './api-response';

export interface RVChartStatementBaseParameter {
  summary: RVReportStatementSummary;
  reportFrequency: RVReportFrequency;
  chart: RVOptionsChartStyle;
  quarter?: string;
  month?: RVMonths;
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
  path?: string;
  filter: RVFilterAll;
}

export interface RVReportRequest {
  url: string;
}
