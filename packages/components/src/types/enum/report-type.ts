export enum RVReportTypes {
  BALANCE_SHEET = 'balanceSheets',
  BANK_ACCOUNT = 'bankAccounts',
  BILLS = 'bills',
  CASHFLOW_STATEMENTS = 'cashflowStatements',
  CREDIT_SCORE = 'creditScores',
  EXPENSES = 'expenses',
  FINANCIAL_RATIO = 'financialRatios',
  INCOME_STATEMENTS = 'incomeStatements',
  INVOICES = 'invoices',
  REVENUE = 'revenue',
  RAILZ_SCORE = 'railzScore',
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
  [RVReportTypes.BALANCE_SHEET]: '/reports/balanceSheets',
  [RVReportTypes.BANK_ACCOUNT]: '/bankAccounts',
  [RVReportTypes.BILLS]: '/reports/bills',
  [RVReportTypes.CASHFLOW_STATEMENTS]: '/reports/cashflowStatements',
  [RVReportTypes.CREDIT_SCORE]: '/reports/creditScores',
  [RVReportTypes.EXPENSES]: '/reports/expenses',
  [RVReportTypes.FINANCIAL_RATIO]: '/reports/financialRatios',
  [RVReportTypes.INCOME_STATEMENTS]: '/reports/incomeStatements',
  [RVReportTypes.INVOICES]: '/reports/invoices',
  [RVReportTypes.REVENUE]: '/reports/revenue',
  [RVReportTypes.RAILZ_SCORE]: '/reports/railzScore',
};
