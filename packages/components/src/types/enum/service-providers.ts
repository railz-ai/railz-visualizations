// Railz Visualization Service Providers

export enum RVSandboxProviders {
  SANDBOX = 'sandbox',
}

export enum RVBankingProviders {
  PLAID = 'plaid',
}

export enum RVAccountingProviders {
  DYNAMICS_BUSINESS_CENTRAL = 'dynamicsBusinessCentral',
  FRESHBOOKS = 'freshbooks',
  QUICKBOOKS = 'quickbooks',
  QUICKBOOKS_DESKTOP = 'quickbooksDesktop',
  ORACLE_NETSUITE = 'oracleNetsuite',
  SAGE_BUSINESS_CLOUD = 'sageBusinessCloud',
  SAGE_INTACCT = 'sageIntacct',
  XERO = 'xero',
}

export type RVServiceProviders = RVAccountingProviders | RVBankingProviders | RVSandboxProviders;
