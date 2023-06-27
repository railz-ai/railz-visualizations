export enum RVReportTypes {
  BALANCE_SHEET = 'balanceSheets',
  BANK_ACCOUNT = 'bankAccounts',
  BILLS = 'bills',
  CASHFLOW_STATEMENTS = 'cashflowStatements',
  CREDIT_SCORE = 'creditScore',
  EXPENSES = 'expenses',
  FINANCIAL_RATIO = 'financialRatios',
  INCOME_STATEMENTS = 'incomeStatements',
  INVOICES = 'invoices',
  REVENUE = 'revenue',
  BANK_RECONCILIATION = 'bankReconciliation',
  BUSINESS_VALUATIONS = 'businessValuations',
}

export type RVFinancialStatementsTypes =
  | RVReportTypes.BALANCE_SHEET
  | RVReportTypes.CASHFLOW_STATEMENTS
  | RVReportTypes.INCOME_STATEMENTS;

export enum RVCreditScoreTypes {
  VERY_POOR = 'Very Poor',
  POOR = 'Poor',
  FAIR = 'Fair',
  GOOD = 'Good',
  VERY_GOOD = 'Very Good',
  EXCELLENT = 'Excellent',
}

export const RVReportTypesUrlMapping = {
  [RVReportTypes.BALANCE_SHEET]: '/v2/visualizations/balanceSheets',
  [RVReportTypes.BANK_ACCOUNT]: '/v2/banking/bankAccounts',
  [RVReportTypes.BILLS]: '/v2/visualizations/bills',
  [RVReportTypes.CASHFLOW_STATEMENTS]: '/v2/visualizations/cashflowStatements',
  [RVReportTypes.CREDIT_SCORE]: '/v2/visualizations/railzScore',
  [RVReportTypes.EXPENSES]: '/v2/visualizations/expenses',
  [RVReportTypes.FINANCIAL_RATIO]: '/v2/visualizations/financialRatios',
  [RVReportTypes.INCOME_STATEMENTS]: '/v2/visualizations/incomeStatements',
  [RVReportTypes.INVOICES]: '/v2/visualizations/invoices',
  [RVReportTypes.REVENUE]: '/v2/visualizations/revenue',
  [RVReportTypes.BANK_RECONCILIATION]: '/v2/analytics/bankReconciliation',
  [RVReportTypes.BUSINESS_VALUATIONS]: '/v2/analytics/businessValuations',
};
