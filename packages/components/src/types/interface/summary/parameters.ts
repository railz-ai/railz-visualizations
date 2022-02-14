import {RVBillInvoiceSummary, RVReportStatementSummary} from "./api-response";
import {RVReportFrequency} from "../../enum/date";
import {RVFinancialStatementsTypes} from "../../enum/report-type";
import {RVFormattedStatementData} from "./formatted-data";
import {RVOptions} from "../option";
import {RVConfiguration} from "../configuration";
import {RVFilterDate, RVFilterFrequency} from "../filter";

export interface RVChartStatementBaseParameter {
  summary: RVReportStatementSummary;
  reportFrequency: RVReportFrequency;
  colors: string[];
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


export interface RVReportRequestParameter {
  filter: RVFilterFrequency;
  configuration: RVConfiguration;
}
export interface RVReportRequestDateParameter {
  filter: RVFilterDate;
  configuration: RVConfiguration;
}

