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
