export interface RailzVisualizationsFilter {
  businessName?: string;
  serviceName?: 'quickbooks' | 'quickbooksDesktop' | 'oracleNetsuite' | 'sageBusinessCloud' | 'sageIntacct' | 'freshbooks' | 'xero' | 'sandbox' | 'plaid';
  connectionId?: string; // if field is passed, do not use businessName and serviceName combination
  reportType: 'balanceSheets' | 'incomeStatements' | 'cashflowStatements' | 'invoices' | 'bills';
  startDate?: string; // required based on report type,
  endDate?: string; // required based on report type,
  reportFrequency?: 'month' | 'quarter' | 'year'; // required based on report type,
}

export interface RailzVisualizationsConfiguration {
  token: string;
  debug: boolean;
}
export interface RailzVisualizationsData {
  overdueAmount?: number;
  paidAmount?: number;
  unpaidAmount?: number;
  categories?: string;
  series?: any[];
}

export interface RailzVisualizationsOptions {
  container: {
    style?: any;
    tooltip?: boolean;
    date?: boolean;
  };
  title?: {
    text?: string;
    style?: any;
  };
  chart?: {
    colors?: string[];
    style?: {
      fontFamily: string;
      label: any;
      legend: any;
      width: string;
      height: string;
    };
    date?: {
      quarter: string;
    };
  };
}
