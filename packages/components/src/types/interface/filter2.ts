import { RVServiceProviders } from '../enum';
import { RVReportFrequency } from '../enum/date';
import { RVReportTypes } from '../enum/report-type';

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

export interface RVFilterFrequency {
  /**
   * reportFrequency: The snapshot frequency (month, quarter, year)
   */
  reportFrequency: RVReportFrequency;
}

export interface RVFilterType {
  /**
   * All reportType: Type of report, bankAccounts, creditScores
   */
  reportType: RVReportTypes;
}

export interface RVAccountingMethod {
  /**
   * reportType: Type of report, bankAccounts, creditScores
   */
  reportType: RVReportTypes;
}

export interface RVFilterBalanceSheet extends RVFilterBusiness, RVFilterFrequency, RVFilterType {
  reportType: RVReportTypes.BALANCE_SHEET;
}

// BALANCE_SHEET = 'balanceSheets',
// BANK_ACCOUNT = 'bankAccounts',
// BILLS = 'bills',
// CASHFLOW_STATEMENTS = 'cashflowStatements',
// CREDIT_SCORE = 'creditScores',
// EXPENSES = 'expenses',
// FINANCIAL_RATIO = 'financialRatios',
// INCOME_STATEMENTS = 'incomeStatements',
// INVOICES = 'invoices',
// REVENUE = 'revenue',
// RAILZ_SCORE = 'railzScore',

// export type RVBaseFilter = RVFilterBusiness | RVFilterConnection;
// export type RVBaseFilterDate = RVBaseFilterConnectionDate | RVBaseFilterBusinessDate;
// export type RVBaseFilterDateFrequency =
//   | RVBaseFilterConnectionDateFrequency
//   | RVBaseFilterBusinessDateFrequency;
// export type RVBaseAllFilter = RVBaseFilter | RVBaseFilterDate | RVBaseFilterDateFrequency;

// export type RVFilterFrequency =
//   | RVBaseFilterConnectionDateFrequencyType
//   | RVBaseFilterBusinessDateFrequencyType;
// export type RVFilterDate = RVBaseFilterConnectionDateType | RVBaseFilterBusinessDateType;
// export type RVFilterType = RVBaseFilterConnectionType | RVBaseFilterBusinessType;
// export type RVFilter = RVFilterFrequency | RVFilterDate | RVFilterType;

export type RVDateFilters = RVFilterDate | RVFilterFrequency;
export type RVAllFilter = RVFilterDate | RVFilterFrequency;
