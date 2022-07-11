import {
  RVBankAccounts,
  RVBillInvoiceSummary,
  RVCreditScore,
  RVIncomeStatementsSummary,
} from './api-response';

export interface RVFormattedStatementSeriesOptional {
  type?: string;
  marker?: {
    enabled?: boolean;
  };
  states?: {
    hover?: {
      lineWidth?: number;
    };
  };
  enableMouseTracking?: boolean;
}

export interface RVFormattedStatementSeries extends RVFormattedStatementSeriesOptional {
  name: string;
  data: number[];
}

export interface RVFormattedStatementData {
  categories: string[];
  series: RVFormattedStatementSeries[];
  colors: string[];
}

export type RVFormattedData =
  | RVFormattedStatementData
  | RVIncomeStatementsSummary
  | RVBillInvoiceSummary
  | RVBankAccounts[]
  | RVCreditScore;
