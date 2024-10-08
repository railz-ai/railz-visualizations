// Accounting Data as a Service™ Visualization Service Providers

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
  WAVE = 'wave',
}

export enum RVCommerceProviders {
  SQUARE = 'square',
  SHOPIFY = 'shopify',
}

export const RVAllProviders = {
  ...RVAccountingProviders,
  ...RVBankingProviders,
  ...RVCommerceProviders,
  ...RVSandboxProviders,
};
export type RVAllProviders = typeof RVAllProviders;

export type RVServiceProviders =
  | RVAccountingProviders
  | RVBankingProviders
  | RVCommerceProviders
  | RVSandboxProviders;
