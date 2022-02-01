export interface RailzVisualizationsFilter {
  businessName?: string;
  serviceName?: 'quickbooks' | 'quickbooksDesktop' | 'oracleNetsuite' | 'sageBusinessCloud' | 'sageIntacct' | 'freshbooks' | 'xero' | 'sandbox' | 'plaid';
  connectionId?: string; // if field is passed, do not use businessName and serviceName combination
  reportType: 'balanceSheets' | 'incomeStatement' | 'cashFlow';
  startDate?: string; // required based on report type,
  endDate?: string; // required based on report type,
  reportFrequency?: 'month' | 'quarter' | 'year'; // required based on report type,
}

export interface RailzVisualizationsConfiguration {
  token: string;
  debug: boolean;
}

export interface RailzVisualizationsOptions {
  container: {
    style: any;
    tooltip: boolean;
  };
}
