import { RVReportFrequency } from "../../enum/date";
import { RVFinancialStatementsTypes } from "../../enum/report-type";

import { RVOptions, RVOptionsChart } from "../option";
import { RVConfiguration } from "../configuration";
import { RVFilterDate, RVFilterFrequency } from "../filter";

import { RVFormattedStatementData } from "./formatted-data";
import { RVBillInvoiceSummary, RVReportStatementSummary } from "./api-response";

export interface RVChartStatementBaseParameter {
  summary: RVReportStatementSummary;
  reportFrequency: RVReportFrequency;
  colors: string[];
}

export interface RVChartStatementParameter
  extends RVChartStatementBaseParameter {
  reportType: RVFinancialStatementsTypes;
}

export interface RVChartTransactionsBaseParameter {
  summary: RVBillInvoiceSummary;
  colors: string[];
}

export interface RVChartTransactionsParameter
  extends RVChartTransactionsBaseParameter {
  reportType: RVFinancialStatementsTypes;
}

export interface RVUpdateChartParameter {
  containerRef?: HTMLDivElement;
  dataFormatted: RVFormattedStatementData;
  options: RVOptions;
}

export interface RVChartOptionsParameter extends RVFormattedStatementData {
  chart: RVOptionsChart;
}

export interface RVReportRequestParameter {
  filter: RVFilterFrequency;
  configuration: RVConfiguration;
}
export interface RVReportRequestDateParameter {
  filter: RVFilterDate;
  configuration: RVConfiguration;
}
