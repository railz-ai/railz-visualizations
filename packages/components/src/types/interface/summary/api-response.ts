import {RVCreditScoreTypes} from "../../enum/report-type";
import {RVReportFrequency} from "../../enum/date";

export interface RVPeriod {
  date: number;
  day: number;
  month: number;
  quarter: number;
  year: number;
}

export interface RVPeriodData {
  period: RVPeriod;
  value: number;
}

export interface RVBillInvoiceSummary {
  unpaidAmount: number;
  paidAmount: number;
  overdueAmount: number;
}

export interface RVRevenueExpensesSubSection {
  amount: number;
  name: string;
}

export interface RVRevenueExpensesSummary {
  percentageChange: number;
  totalAmount: number;
  subSections: RVRevenueExpensesSubSection[];
}

export interface RVSummaryPeriod {
  period: RVPeriod;
}

export interface RVCashflowSummary extends RVSummaryPeriod {
  operatingActivities: number;
  financingActivities: number;
  investingActivities: number;
}

export interface RVBalanceSheetSummary extends RVSummaryPeriod {
  assets: number;
  equity: number;
  liabilities: number;
}

export interface RVIncomeStatementSummary extends RVSummaryPeriod {
  operatingIncome: number;
  operatingExpenses: number;
  costOfGoodsSold: number;
  otherIncome: number;
  otherExpenses: number;
}

export interface RVLoadingErrorState {
  statusCode: number;
  loading: boolean;
}

export interface RVBillInvoiceReportSummary extends RVLoadingErrorState {
  summary: RVBillInvoiceSummary;
}

export interface RVRevenueExpensesReportSummary extends RVLoadingErrorState {
  summary: RVRevenueExpensesSummary;
}

export interface RVCashflowReportSummary extends RVLoadingErrorState {
  summary: RVCashflowSummary[];
}

export interface RVBalanceSheetReportSummary extends RVLoadingErrorState {
  summary: RVBalanceSheetSummary[];
}

export interface RVIncomeStatementReportSummary extends RVLoadingErrorState {
  summary: RVIncomeStatementSummary[];
}


export interface RVFinancialRatioItem {
  currentValue: number;
  percentageChange: number;
  timePeriodData: Array<RVPeriodData>;
}

export interface RVFinancialRatioSummary {
  [key: string]: {
    [key: string]: RVFinancialRatioItem;
  };
}

export interface RVFinancialRatioReportSummary extends RVLoadingErrorState {
  summary: RVFinancialRatioSummary;
}

export interface RVBankAccounts {
  institutionName: string;
  accountId: string;
  currentBalance: number;
  availableBalance: number;
  limit: number;
  currency: string;
  maskedAccountNumber: string;
  accountName: string;
  officialAccountName: string;
  accountType: string;
  accountSubType: string;
  sourceModifiedDate: string;
}

export interface RVBankAccount {
  [key: string]: Array<RVBankAccounts>;
}

export interface RVCreditScore {
  score: number;
  rating: RVCreditScoreTypes;
  lastUpdated: string;
}

export interface RVBankAccountsReportSummary extends RVLoadingErrorState {
  summary: RVBankAccounts[];
}

export interface BankAccountReportSummary extends RVLoadingErrorState {
  summary: RVBankAccount;
}

export interface RVCreditScoresReportSummary extends RVLoadingErrorState {
  summary: RVCreditScore;
}

export interface RVReportMetaResponse {
  reportId: string[];
  serviceName: string;
  businessName: string;
  startDate: string;
  endDate: string;
  currency?: string[];
  reportFrequency: RVReportFrequency;
}

export type RVReportSummary =
  | RVIncomeStatementSummary[]
  | RVBalanceSheetSummary[]
  | RVCashflowSummary[]
  | RVRevenueExpensesSummary
  | RVBillInvoiceSummary | RVCreditScore;

export type RVReportStatementSummary =
  | RVIncomeStatementSummary[]
  | RVBalanceSheetSummary[]
  | RVCashflowSummary[];

export class RVReportSummaryResponse {
  meta: RVReportMetaResponse;
  data: RVReportSummary;
}

interface RVErrorInstance {
  statusCode: number;
  message: string;
  error: string;
}

export interface RVErrorResponse {
  error: RVErrorInstance;
  payload: any;
  statusCode?: number;
}

export class RVReportSummaryApiResponse {
  error?: RVErrorResponse;
  data?: RVReportSummaryResponse;
  status?: number;
}

export class RVFormattedStatementResponse {
  error?: RVErrorResponse;
  data?: RVReportStatementSummary;
  status?: number;
}

export class RVFormattedTransactionResponse {
  error?: RVErrorResponse;
  data?: RVBillInvoiceSummary;
  status?: number;
}
