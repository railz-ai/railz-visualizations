import { RVCreditScoreTypes } from '../../enum/report-type';
import { RVReportFrequency } from '../../enum/date';

export interface RVPeriod {
  date: number | string;
  day: number;
  month: number;
  quarter: number;
  year: number;
}

export interface ErrorResponseObject {
  error?: {
    error: string;
    message: Array<string>;
    statusCode: number;
  };
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

export interface RVIncomeStatementsSummary {
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
  summary: RVIncomeStatementsSummary;
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
  availableBalance?: number;
  limit?: number;
  currency: string;
  maskedAccountNumber: string;
  accountName: string;
  officialAccountName: string;
  accountType: string;
  accountSubType: string;
  sourceModifiedDate?: string;
}

export interface RVBankAccount {
  [key: string]: Array<RVBankAccounts>;
}

export interface RVCreditScore {
  score: number;
  rating: RVCreditScoreTypes;
  lastUpdated: string;
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
  | RVIncomeStatementsSummary
  | RVBillInvoiceSummary
  | RVCreditScore;

export type RVReportStatementSummary =
  | RVIncomeStatementSummary[]
  | RVBalanceSheetSummary[]
  | RVCashflowSummary[];

export interface RVReportSummaryResponse {
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
  message?: Array<string>;
}

export interface RVReportSummaryApiResponse {
  error?: RVErrorResponse;
  data?: RVReportSummaryResponse;
  status?: number;
}

export interface RVCreditScoreSummary {
  score: number;
  rating: string;
  lastUpdated: string;
  percentage?: boolean;
}

export interface RVFormattedScoreResponse {
  error?: RVErrorResponse;
  data?: RVCreditScoreSummary;
  status?: number;
  meta?: RVReportMetaResponse;
}

export interface RVBankReconciliationApiResponse {
  error?: {
    error: string;
    message: Array<string>;
    statusCode: number;
  };
  payload?: any;
  data?: RVReportSummaryResponse;
  status?: number;
  count: number;
  pagination: any;
  reports?: Array<any>;
}

export interface RVBankReconciliation {
  count: number;
  pagination: any;
  reports?: Array<any>;
}

export interface RVBusinessValuations extends ErrorResponseObject {
  count: number;
  reports?: Array<any>;
  status?: number;
}

export interface RVFormattedPieResponse {
  error?: RVErrorResponse;
  data?: RVIncomeStatementsSummary;
  status?: number;
}

export interface RVFormattedFinancialRatioResponse {
  error?: RVErrorResponse;
  data?: RVFinancialRatioSummary;
  status?: number;
}

export interface RVFormattedBankAccountsResponse {
  error?: RVErrorResponse;
  data?: RVBankAccounts[];
  status?: number;
}

export interface RVFormattedStatementResponse {
  error?: RVErrorResponse;
  data?: RVReportStatementSummary;
  status?: number;
}

export interface RVFormattedTransactionResponse {
  error?: RVErrorResponse;
  data?: RVBillInvoiceSummary;
  status?: number;
}

export interface RVTaxBenchmarking extends ErrorResponseObject {
  count: number;
  reports?: Array<any>;
  status?: number;
}
export class BusinessValuesFormattedData {
  section?: Record<string, number>;
  subSection?: Record<string, number>;
  group?: Record<string, number>;
  subGroup?: Record<string, number>;
}

export class TaxBenchmarkingSubItems {
  max: Record<string, number>;
  mean: Record<string, number>;
  median: Record<string, number>;
  min: Record<string, number>;
  quantile25: Record<string, number>;
  quantile5: Record<string, number>;
  quantile75: Record<string, number>;
  quantile95: Record<string, number>;
  sdev: Record<string, number>;
  total: Record<string, number>;
}

export class TaxBenchmarkingFormattedData {
  section?: TaxBenchmarkingSubItems;
  subSection?: TaxBenchmarkingSubItems;
  group?: TaxBenchmarkingSubItems;
  subGroup?: TaxBenchmarkingSubItems;
}

export interface RVTaxBenchmarkingReponse extends ErrorResponseObject {
  meta: RVReportMetaResponse;
  businessValues: BusinessValuesFormattedData;
  taxBenchmarkingData?: TaxBenchmarkingFormattedData;
}
