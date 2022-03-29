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
  SCORE = 'railzScore',
}

export enum RVParams {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  REPORT_FREQUENCY = 'reportFrequency',
  BUSINESS_NAME = 'businessName',
  SERVICE_NAME = 'serviceName',
  CONNECTION_ID = 'connectionId',
}

export type RVFinancialStatementsTypes =
  | RVReportTypes.BALANCE_SHEET
  | RVReportTypes.CASHFLOW_STATEMENTS
  | RVReportTypes.INCOME_STATEMENTS;
export type RVFrequencyTypes =
  | RVFinancialStatementsTypes
  | RVReportTypes.FINANCIAL_RATIO
  | RVReportTypes.EXPENSES
  | RVReportTypes.REVENUE;
export type RVFrequencyNoCashflowTypes =
  | RVReportTypes.BALANCE_SHEET
  | RVReportTypes.INCOME_STATEMENTS
  | RVReportTypes.FINANCIAL_RATIO
  | RVReportTypes.EXPENSES
  | RVReportTypes.REVENUE;
export type RVNoFrequencyTypes = RVReportTypes.INVOICES | RVReportTypes.BILLS | RVReportTypes.SCORE;
export type RVNoDateTypes = RVReportTypes.BANK_ACCOUNT | RVReportTypes.CREDIT_SCORE;

export enum RVCreditScoreTypes {
  VERY_POOR = 'Very Poor',
  POOR = 'Poor',
  FAIR = 'Fair',
  GOOD = 'Good',
  VERY_GOOD = 'Very Good',
  EXCELLENT = 'Excellent',
}
