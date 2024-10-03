import { FinancialRatio } from './summary';

export interface RVFormat {
  locale?: string;
  format?: string;
  prefix?: string;
}

export interface RVFinancialRatioContent {
  [FinancialRatio.DISTANCE_TO_DEFAULT]?: string;
  [FinancialRatio.PROBABILITY_OF_DEFAULT]?: string;
  [FinancialRatio.LIQUIDATION_VALUE]?: string;
  [FinancialRatio.GROSS_BURN_RATE]?: string;
  [FinancialRatio.INVENTORY_TURNOVER_RATIO]?: string;
  [FinancialRatio.RECEIVABLES_TURNOVER_RATIO]?: string;
  [FinancialRatio.ASSET_TURNOVER_RATIO]?: string;
  [FinancialRatio.EQUITY_TO_LT_ASSETS]?: string;
  [FinancialRatio.SHORT_DEBT_TO_EQUITY_RATIO]?: string;
  [FinancialRatio.DEBT_TO_EQUITY_RATIO]?: string;
  [FinancialRatio.INTEREST_BANK_LOAN]?: string;
  [FinancialRatio.INTEREST_COVERAGE_RATIO]?: string;
  [FinancialRatio.DEBT_TO_ASSETS_RATIO]?: string;
  [FinancialRatio.DEBT_TO_SERVICE_COVERAGE_RATIO]?: string;
  [FinancialRatio.QUICK_RATIO]?: string;
  [FinancialRatio.ABSOLUTE_LIQUIDITY]?: string;
  [FinancialRatio.CURRENT_RATIO]?: string;
  [FinancialRatio.GROSS_BURN]?: string;
  [FinancialRatio.RUNWAY]?: string;
  [FinancialRatio.CASH_RATIO]?: string;
  [FinancialRatio.FREE_CASHFLOW_RATIO]?: string;
  [FinancialRatio.DEBT_TO_ENTERPRISE_VALUE]?: string;
  [FinancialRatio.ENTERPRISE_VALUE]?: string;
  [FinancialRatio.RETURN_ON_ASSETS]?: string;
  [FinancialRatio.EBITDA]?: string;
  [FinancialRatio.EBITDA_MARGIN]?: string;
  [FinancialRatio.WORKING_CAPITAL]?: string;
  [FinancialRatio.FREE_CASHFLOW]?: string;
  [FinancialRatio.GROSS_MARGIN]?: string;
  [FinancialRatio.NET_PROFIT_MARGIN]?: string;
  [FinancialRatio.OPERATING_MARGIN]?: string;
  [FinancialRatio.RETURN_ON_EQUITY]?: string;
  [FinancialRatio.REVENUE_CONCENTRATION_INDEX]?: string;
  [FinancialRatio.AVERAGE_COLLECTION_PERIOD]?: string;
  [FinancialRatio.PAYABLES_CONVERSION_PERIOD]?: string;
  [FinancialRatio.LEVERAGE_INDEX]?: string;
  [FinancialRatio.TOTAL_ACCRUALS_TOTAL_ASSETS]?: string;
  [FinancialRatio.GROSS_MARGIN_INDEX]?: string;
  [FinancialRatio.SALES_MARGIN_INDEX]?: string;
  [FinancialRatio.SGA_EXPENSES_INDEX]?: string;
  [FinancialRatio.DAYS_SALES_RECEIVABLES_INDEX]?: string;
  [FinancialRatio.ASSET_QUALITY_INDEX]?: string;
  [FinancialRatio.DEPRECIATION_INDEX]?: string;
  [FinancialRatio.ACCOUNTS_RECEIVABLE_TURNOVER_RATIO]?: string;
  [FinancialRatio.ACCOUNTS_PAYABLE_TURNOVER_RATIO]?: string;
  [FinancialRatio.DAYS_PAYABLE_OUTSTANDING]?: string;
  [FinancialRatio.AVERAGE_OUTSTANDING_PAYABLES_BALANCE]?: string;
  [FinancialRatio.AVERAGE_OUTSTANDING_RECEIVABLES_BALANCE]?: string;
}

export interface RVContentTooltip extends RVFinancialRatioContent {
  description?: string;
}

export interface RVContent {
  title?: string;
  subTitle?: string;
  date?: RVFormat;
  label?: RVFinancialRatioContent;
  tooltip?: RVContentTooltip;
}
