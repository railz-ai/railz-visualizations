import {
  RVReportFrequency,
  RVReportTypes,
  RVServiceProviders,
} from '@railzai/railz-visualizations';

type AllTypes = 'all' & RVReportTypes;
export interface Filter {
  businessName?: string;
  serviceName?: RVServiceProviders;
  connectionUuid?: string;
  startDate?: string;
  endDate?: string;
  reportFrequency?: RVReportFrequency;
  reportType: AllTypes;
}
