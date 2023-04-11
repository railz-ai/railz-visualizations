import { RVServiceProviders, RVReportFrequency, RVReportTypes, RVAccountingMethod } from '../enum';

export interface RVFilterBusiness {
  /**
   * businessName: Unique business name identifier.
   * required **if connectionId is not passed**
   */
  businessName: string;
  /**
   * serviceName: Name of accounting platform service.
   * required **if connectionId is not passed**
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
   * connectionId: Unique Connection identifier.
   * required **if businessName and serviceName are not passed**
   */
  connectionId: string;
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

export interface RVFilterBalanceSheet
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.BALANCE_SHEET;
}

export interface RVFilterBankAccount extends RVFilterReportType, RVFilterBusiness {
  reportType: RVReportTypes.BANK_ACCOUNT;
}

export interface RVFilterBills extends RVFilterReportType, RVFilterBusiness, RVFilterDate {
  reportType: RVReportTypes.BILLS;
}

export interface RVFilterCashflowStatements
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.CASHFLOW_STATEMENTS;
}

export interface RVFilterExpenses
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.EXPENSES;
}

export interface RVFilterFinancialRatio
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.FINANCIAL_RATIO;
}

export interface RVFilterIncomeStatements
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.INCOME_STATEMENTS;
}

export interface RVFilterInvoices
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.INVOICES;
}

export interface RVFilterRevenue
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.REVENUE;
}

export interface RVFilterCreditScore
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.CREDIT_SCORE;
}

export interface RVFilterBankReconciliation
  extends RVFilterReportType,
    RVFilterBusiness,
    RVFilterDate,
    RVFilterReportFrequency {
  reportType: RVReportTypes.BANK_RECONCILIATION;
}

export interface RVFilterAll
  extends RVFilterBusiness,
    RVFilterConnection,
    RVFilterDate,
    RVFilterReportFrequency,
    RVFilterReportType {}

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
  | RVFilterDate;

export type RVFilterTransactions = RVFilterInvoices | RVFilterBills;
export type RVFilterStatements =
  | RVFilterBalanceSheet
  | RVFilterIncomeStatements
  | RVFilterCashflowStatements;
export type RVFilterIncomeStatementsType = RVFilterExpenses | RVFilterRevenue;
