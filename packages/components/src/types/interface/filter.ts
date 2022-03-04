import {RVFrequencyTypes, RVServiceProviders} from '../enum';
import { RVReportFrequency } from '../enum/date';
import { RVNoDateTypes, RVNoFrequencyTypes } from '../enum/report-type';

export interface RVBaseFilterBusiness {
  businessName: string;
  serviceName: RVServiceProviders;
}

export interface RVBaseFilterConnection {
  connectionId: string;
}

export interface RVBaseFilterBusinessDate extends RVBaseFilterBusiness {
  startDate: string; // required based on report type,
  endDate: string; // required based on report type,
}

export interface RVBaseFilterConnectionDate extends RVBaseFilterConnection {
  startDate: string;
  endDate: string;
}

export interface RVBaseFilterConnectionDateFrequency extends RVBaseFilterConnectionDate {
  reportFrequency: RVReportFrequency;
}

export interface RVBaseFilterBusinessDateFrequency extends RVBaseFilterBusinessDate {
  reportFrequency: RVReportFrequency;
}

export interface RVBaseFilterConnectionType extends RVBaseFilterBusiness {
  reportType: RVNoDateTypes;
}

export interface RVBaseFilterBusinessType extends RVBaseFilterConnection {
  reportType: RVNoDateTypes;
}

export interface RVBaseFilterConnectionDateFrequencyType extends RVBaseFilterConnectionDateFrequency {
  reportType: RVFrequencyTypes;
}

export interface RVBaseFilterBusinessDateFrequencyType extends RVBaseFilterBusinessDateFrequency {
  reportType: RVFrequencyTypes;
}

export interface RVBaseFilterConnectionDateType extends RVBaseFilterBusinessDate {
  reportType: RVNoFrequencyTypes;
}

export interface RVBaseFilterBusinessDateType extends RVBaseFilterConnectionDate {
  reportType: RVNoFrequencyTypes;
}

export type RVStatementsFilter = (
  | RVBaseFilterConnectionDateFrequencyType
  | RVBaseFilterBusinessDateFrequencyType
) & {
  reconstruct?: boolean;
};

export type RVBaseFilter = RVBaseFilterBusiness | RVBaseFilterConnection;
export type RVBaseFilterDate = RVBaseFilterConnectionDate | RVBaseFilterBusinessDate;
export type RVBaseFilterDateFrequency = RVBaseFilterConnectionDateFrequency | RVBaseFilterBusinessDateFrequency;
export type RVBaseAllFilter = RVBaseFilter | RVBaseFilterDate | RVBaseFilterDateFrequency;
export type RVFilterFrequency = RVBaseFilterConnectionDateFrequencyType | RVBaseFilterBusinessDateFrequencyType;
export type RVFilterDate = RVBaseFilterConnectionDateType | RVBaseFilterBusinessDateType;
export type RVFilterType = RVBaseFilterConnectionType | RVBaseFilterBusinessType;
export type RVFilter = RVFilterFrequency | RVFilterDate | RVFilterType;
export type RVDateFilters = RVFilterDate | RVFilterFrequency;
export type RVAllFilter = RVFilterDate | RVFilterFrequency;
