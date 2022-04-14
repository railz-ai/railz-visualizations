import { RVFrequencyTypes, RVServiceProviders } from '../enum';
import { RVReportFrequency } from '../enum/date';
import { RVNoDateTypes, RVNoFrequencyTypes } from '../enum/report-type';

export interface RVBaseFilterBusiness {
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

export interface RVBaseFilterConnection {
  /**
   * connectionId: Unique Connection identifier.
   * required **if businessName and serviceName are not passed**
   */
  connectionId: string;
}

export interface RVBaseFilterBusinessDate extends RVBaseFilterBusiness {
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

export interface RVBaseFilterConnectionDate extends RVBaseFilterConnection {
  /**
   * startDate: Date from which the data begins
   * format: **yyyy-MM-dd**
   */
  startDate: string;
  /**
   * endDate: Date which the data ends
   * format: **yyyy-MM-dd**
   */
  endDate: string;
}

export interface RVBaseFilterConnectionDateFrequency extends RVBaseFilterConnectionDate {
  /**
   * reportFrequency: The snapshot frequency (month, quarter, year)
   */
  reportFrequency: RVReportFrequency;
}

export interface RVBaseFilterBusinessDateFrequency extends RVBaseFilterBusinessDate {
  /**
   * reportFrequency: The snapshot frequency (month, quarter, year)
   */
  reportFrequency: RVReportFrequency;
}

export interface RVBaseFilterConnectionType extends RVBaseFilterBusiness {
  /**
   * reportType: Type of report, bankAccounts, creditScores
   */
  reportType: RVNoDateTypes;
}

export interface RVBaseFilterBusinessType extends RVBaseFilterConnection {
  /**
   * reportType: Type of report, bankAccounts, creditScores
   */
  reportType: RVNoDateTypes;
}

export interface RVBaseFilterConnectionDateFrequencyType
  extends RVBaseFilterConnectionDateFrequency {
  /**
   * reportType: Type of report, cashflowStatements, balanceSheets, incomeStatements
   */
  reportType: RVFrequencyTypes;
}

export interface RVBaseFilterBusinessDateFrequencyType extends RVBaseFilterBusinessDateFrequency {
  /**
   * reportType: Type of report, cashflowStatements, balanceSheets, incomeStatements
   */
  reportType: RVFrequencyTypes;
}

export interface RVBaseFilterBusinessDateType extends RVBaseFilterBusinessDate {
  /**
   * reportType: Type of transaction, invoices, bills
   */
  reportType: RVNoFrequencyTypes;
}

export interface RVBaseFilterConnectionDateType extends RVBaseFilterConnectionDate {
  /**
   * reportType: Type of transaction, invoices, bills
   */
  reportType: RVNoFrequencyTypes;
}

export type RVBaseFilter = RVBaseFilterBusiness | RVBaseFilterConnection;
export type RVBaseFilterDate = RVBaseFilterConnectionDate | RVBaseFilterBusinessDate;
export type RVBaseFilterDateFrequency =
  | RVBaseFilterConnectionDateFrequency
  | RVBaseFilterBusinessDateFrequency;
export type RVBaseAllFilter = RVBaseFilter | RVBaseFilterDate | RVBaseFilterDateFrequency;
export type RVFilterFrequency =
  | RVBaseFilterConnectionDateFrequencyType
  | RVBaseFilterBusinessDateFrequencyType;
export type RVFilterDate = RVBaseFilterConnectionDateType | RVBaseFilterBusinessDateType;
export type RVFilterType = RVBaseFilterConnectionType | RVBaseFilterBusinessType;
export type RVFilter = RVFilterFrequency | RVFilterDate | RVFilterType;
export type RVDateFilters = RVFilterDate | RVFilterFrequency;
export type RVAllFilter = RVFilterDate | RVFilterFrequency;
