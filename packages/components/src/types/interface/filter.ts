import { RVServiceProviders, RVReportFrequency, RVReportTypes, RVAccountingMethod } from '../enum';

export interface RVFilterBusiness {
  /**
   * businessName: Unique business name identifier.
   * required **if connectionUuid is not passed**
   */
  businessName: string;
  /**
   * serviceName: Name of accounting platform service.
   * required **if connectionUuid is not passed**
   * (sandbox, quickBooks, quickBooksDesktop, freshBooks,
   * xero, oracleNetsuite, sageBusinessCloud, sageIntacct, dynamicsBusinessCentral)
   */
  serviceName: RVServiceProviders;
}

/**
 * RVFilterConnection
 * Not currently being used, since web-backend hasn't implemented this
 */
export interface RVFilterConnection {
  /**
   * connectionUuid: Unique Connection identifier.
   * required **if businessName and serviceName are not passed**
   */
  connectionUuid: string;
}

export interface RVFilterIndustryCodeAndRegion {
  /**
   * industryCode: industry code from dropdown.
   * region: region from dropdown.
   * required **
   */
  industryCode: string;
  region: string;
}

export interface RVFilterDate {
  /**
   * startDate: Date from which the data begins
   * format: **yyyy-MM-dd**
   */
  startDate: string; // required based on report type,
  /**
   * endDate: Date which the data ends
   * format: **yyyy-MM-dd**
   */
  endDate: string; // required based on report type,
}

export interface RVFilterEndOptionalDate {
  /**
   * endDate: Date which the data ends
   * format: **yyyy-MM-dd**
   */
  endDate?: string; // optional based on report type,
}

export interface RVFilterReportFrequency {
  /**
   * reportFrequency: The snapshot frequency (month, quarter, year)
   */
  reportFrequency: RVReportFrequency;
}

export interface RVFilterAccountingMethod {
  /**
   * accountingMethod: the enum for accounting methods: accrual or cash
   */
  accountingMethod: RVAccountingMethod;
}

export interface RVFilterReportType {
  /**
   * reportType: the enum for to say the type of the report to be displayed
   */
  reportType: RVReportTypes;
}

export interface RVFilterFinancialStatementType {
  /**
   * financialStatementType: the enum for to say the type of financial statement
   */
  financialStatementType: 'incomeStatements' | 'balanceSheets' | 'cashflowStatements';
}

export interface RVFilterBalanceSheet
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.BALANCE_SHEET;
}

export interface RVFilterFinancialForecasts
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency,
    RVFilterFinancialStatementType {
  reportType: RVReportTypes.FINANCIAL_FORECASTS;
  percentile?: number;
  reconstruct?: boolean;
}

export interface RVFilterBankAccount extends RVFilterReportType, RVFilterConnection {
  reportType: RVReportTypes.BANK_ACCOUNT;
}

export interface RVFilterBills extends RVFilterReportType, RVFilterConnection, RVFilterDate {
  reportType: RVReportTypes.BILLS;
}

export interface RVFilterCashflowStatements
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.CASHFLOW_STATEMENTS;
}

export interface RVFilterExpenses
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.EXPENSES;
}

export interface RVFilterFinancialRatio
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.FINANCIAL_RATIO;
}

export interface RVFilterIncomeStatements
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.INCOME_STATEMENTS;
}

export interface RVFilterInvoices
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.INVOICES;
}

export interface RVFilterRevenue
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.REVENUE;
}

export interface RVFilterCreditScore
  extends RVFilterReportType,
    RVFilterEndOptionalDate,
    RVFilterConnection,
    RVFilterReportFrequency {
  reportType: RVReportTypes.CREDIT_SCORE;
}

export interface RVFilterBankReconciliation
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.BANK_RECONCILIATION;
}

export interface RVFilterBusinessValuations
  extends RVFilterReportType,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.BUSINESS_VALUATIONS;
}

export interface RVFilterTaxBenchmarking extends RVFilterReportType, RVFilterConnection {
  industryCode?: string;
  region?: string;
  reportType: RVReportTypes.TAX_BENCHMARKING;
}

export interface RVFilterAll
  extends RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency,
    RVFilterIndustryCodeAndRegion,
    RVFilterReportType,
    RVFilterFinancialStatementType {
  percentile?: number;
  reconstruct: boolean;
}

export type RVFilterAllReportTypes =
  | RVFilterBalanceSheet
  | RVFilterBankAccount
  | RVFilterBills
  | RVFilterCashflowStatements
  | RVFilterExpenses
  | RVFilterFinancialRatio
  | RVFilterIncomeStatements
  | RVFilterInvoices
  | RVFilterRevenue
  | RVFilterCreditScore
  | RVFilterBankReconciliation
  | RVFilterBusinessValuations
  | RVFilterDate
  | RVFilterFinancialForecasts;

export type RVFilterTransactions = RVFilterInvoices | RVFilterBills;
export type RVFilterStatements =
  | RVFilterBalanceSheet
  | RVFilterIncomeStatements
  | RVFilterCashflowStatements
  | RVFilterFinancialForecasts;
export type RVFilterIncomeStatementsType = RVFilterExpenses | RVFilterRevenue;
