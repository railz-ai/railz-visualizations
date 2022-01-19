export interface RailzChartsFilter {
  businessName?: string;
  serviceName?: 'quickbooks' | 'quickbooksDesktop' | 'oracleNetsuite' | 'sageBusinessCloud' | 'sageIntacct' | 'freshbooks' | 'xero' | 'sandbox' | 'plaid';
  connectionId?: string; // if field is passed, do not use businessName and serviceName combination
  reportType?: 'balanceSheet' | 'cashFlow';
  startDate?: string; // required based on report type,
  endDate?: string; // required based on report type,
  reportFrequency?: 'month' | 'quarter' | 'year'; // required based on report type,
}

export interface RailzChartsConfiguration {
  token: string;
  debug: boolean;
}

export interface RailzChartsOptions {
  container: {
    style: any;
    tooltip: boolean;
  };
}
