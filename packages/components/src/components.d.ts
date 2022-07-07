/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  RVConfiguration,
  RVFilterAllReportTypes,
  RVFilterBankAccount,
  RVFilterCreditScore,
  RVFilterFinancialRatio,
  RVFilterIncomeStatementsType,
  RVFilterStatements,
  RVFilterTransactions,
  RVOptions,
  RVOptionsBarStyle,
  RVOptionsPercentageStyle,
  RVOptionsRatioSparkLineStyle,
  RVPeriodData,
  RVReportTypes,
  RVSelectStyle,
  RVTooltipIndicatorStyle,
} from './types';
export namespace Components {
  interface RailzBankAccounts {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterBankAccount;
    /**
     * For whitelabeling styling
     */
    options: RVOptions;
  }
  interface RailzCreditScore {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterCreditScore;
    /**
     * For whitelabeling styling
     */
    options: RVOptions;
  }
  interface RailzErrorImage {
    /**
     * Fill color of the svg image representing a status code
     */
    fillColor?: string;
    /**
     * Height of the SVG Error Indicator
     */
    height?: string;
    /**
     * Status code based on HTTP Response codes
     */
    statusCode?: number;
    /**
     * Style of the image text
     */
    textStyle?: { [key: string]: any };
    /**
     * Width of the SVG Error Indicator
     */
    width?: string;
  }
  interface RailzFinancialRatios {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterFinancialRatio;
    /**
     * For whitelabeling styling
     */
    options: RVOptions;
  }
  interface RailzIncomeStatements {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterIncomeStatementsType;
    /**
     * For whitelabeling styling
     */
    options: RVOptions;
  }
  interface RailzLoading {
    /**
     * Fill color of the loading indicator
     */
    fillColor?: string;
    /**
     * Height of the SVG Loading Indicator
     */
    height?: string;
    /**
     * Text to display at the bottom of the loading indicator
     */
    loadingText?: string;
    /**
     * Style of the text
     */
    textStyle?: { [key: string]: any };
    /**
     * Width of the SVG Loading Indicator
     */
    width?: string;
  }
  interface RailzPercentage {
    /**
     * Percentage to show
     */
    percentage: number;
    percentageStyle?: RVOptionsPercentageStyle;
  }
  interface RailzProgressBar {
    /**
     * For whitelabeling styling
     */
    options?: RVOptionsBarStyle;
    /**
     * For overdue amount of an invoice or bill
     */
    overdueAmount: number;
    /**
     * For paid amount of an invoice or bill
     */
    paidAmount: number;
    /**
     * To indicate if its an invoice or bill
     */
    reportType?: RVReportTypes.INVOICES | RVReportTypes.BILLS;
    /**
     * For unpaid amount of an invoice or bill
     */
    unpaidAmount: number;
  }
  interface RailzSelect {
    /**
     * The items to be listed
     */
    items: string[];
    /**
     * Position of the Select text when opened
     */
    selectStyle?: RVSelectStyle;
  }
  interface RailzSparklineChart {
    /**
     * Data to display for sparkline
     */
    data: Array<RVPeriodData>;
    sparkLineStyle?: RVOptionsRatioSparkLineStyle;
  }
  interface RailzStatementsChart {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterStatements;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzTooltip {
    /**
     * Question mark with a tooltip text
     */
    text?: string;
    /**
     * Position of the Tooltip text when hovered
     */
    tooltipStyle?: RVTooltipIndicatorStyle;
    tooltipText: string;
  }
  interface RailzTransactionsControl {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterTransactions;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzVisualizations {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterAllReportTypes;
    /**
     * For whitelabeling styling
     */
    options: RVOptions;
  }
}
declare global {
  interface HTMLRailzBankAccountsElement extends Components.RailzBankAccounts, HTMLStencilElement {}
  var HTMLRailzBankAccountsElement: {
    prototype: HTMLRailzBankAccountsElement;
    new (): HTMLRailzBankAccountsElement;
  };
  interface HTMLRailzCreditScoreElement extends Components.RailzCreditScore, HTMLStencilElement {}
  var HTMLRailzCreditScoreElement: {
    prototype: HTMLRailzCreditScoreElement;
    new (): HTMLRailzCreditScoreElement;
  };
  interface HTMLRailzErrorImageElement extends Components.RailzErrorImage, HTMLStencilElement {}
  var HTMLRailzErrorImageElement: {
    prototype: HTMLRailzErrorImageElement;
    new (): HTMLRailzErrorImageElement;
  };
  interface HTMLRailzFinancialRatiosElement
    extends Components.RailzFinancialRatios,
      HTMLStencilElement {}
  var HTMLRailzFinancialRatiosElement: {
    prototype: HTMLRailzFinancialRatiosElement;
    new (): HTMLRailzFinancialRatiosElement;
  };
  interface HTMLRailzIncomeStatementsElement
    extends Components.RailzIncomeStatements,
      HTMLStencilElement {}
  var HTMLRailzIncomeStatementsElement: {
    prototype: HTMLRailzIncomeStatementsElement;
    new (): HTMLRailzIncomeStatementsElement;
  };
  interface HTMLRailzLoadingElement extends Components.RailzLoading, HTMLStencilElement {}
  var HTMLRailzLoadingElement: {
    prototype: HTMLRailzLoadingElement;
    new (): HTMLRailzLoadingElement;
  };
  interface HTMLRailzPercentageElement extends Components.RailzPercentage, HTMLStencilElement {}
  var HTMLRailzPercentageElement: {
    prototype: HTMLRailzPercentageElement;
    new (): HTMLRailzPercentageElement;
  };
  interface HTMLRailzProgressBarElement extends Components.RailzProgressBar, HTMLStencilElement {}
  var HTMLRailzProgressBarElement: {
    prototype: HTMLRailzProgressBarElement;
    new (): HTMLRailzProgressBarElement;
  };
  interface HTMLRailzSelectElement extends Components.RailzSelect, HTMLStencilElement {}
  var HTMLRailzSelectElement: {
    prototype: HTMLRailzSelectElement;
    new (): HTMLRailzSelectElement;
  };
  interface HTMLRailzSparklineChartElement
    extends Components.RailzSparklineChart,
      HTMLStencilElement {}
  var HTMLRailzSparklineChartElement: {
    prototype: HTMLRailzSparklineChartElement;
    new (): HTMLRailzSparklineChartElement;
  };
  interface HTMLRailzStatementsChartElement
    extends Components.RailzStatementsChart,
      HTMLStencilElement {}
  var HTMLRailzStatementsChartElement: {
    prototype: HTMLRailzStatementsChartElement;
    new (): HTMLRailzStatementsChartElement;
  };
  interface HTMLRailzTooltipElement extends Components.RailzTooltip, HTMLStencilElement {}
  var HTMLRailzTooltipElement: {
    prototype: HTMLRailzTooltipElement;
    new (): HTMLRailzTooltipElement;
  };
  interface HTMLRailzTransactionsControlElement
    extends Components.RailzTransactionsControl,
      HTMLStencilElement {}
  var HTMLRailzTransactionsControlElement: {
    prototype: HTMLRailzTransactionsControlElement;
    new (): HTMLRailzTransactionsControlElement;
  };
  interface HTMLRailzVisualizationsElement
    extends Components.RailzVisualizations,
      HTMLStencilElement {}
  var HTMLRailzVisualizationsElement: {
    prototype: HTMLRailzVisualizationsElement;
    new (): HTMLRailzVisualizationsElement;
  };
  interface HTMLElementTagNameMap {
    'railz-bank-accounts': HTMLRailzBankAccountsElement;
    'railz-credit-score': HTMLRailzCreditScoreElement;
    'railz-error-image': HTMLRailzErrorImageElement;
    'railz-financial-ratios': HTMLRailzFinancialRatiosElement;
    'railz-income-statements': HTMLRailzIncomeStatementsElement;
    'railz-loading': HTMLRailzLoadingElement;
    'railz-percentage': HTMLRailzPercentageElement;
    'railz-progress-bar': HTMLRailzProgressBarElement;
    'railz-select': HTMLRailzSelectElement;
    'railz-sparkline-chart': HTMLRailzSparklineChartElement;
    'railz-statements-chart': HTMLRailzStatementsChartElement;
    'railz-tooltip': HTMLRailzTooltipElement;
    'railz-transactions-control': HTMLRailzTransactionsControlElement;
    'railz-visualizations': HTMLRailzVisualizationsElement;
  }
}
declare namespace LocalJSX {
  interface RailzBankAccounts {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterBankAccount;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzCreditScore {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterCreditScore;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzErrorImage {
    /**
     * Fill color of the svg image representing a status code
     */
    fillColor?: string;
    /**
     * Height of the SVG Error Indicator
     */
    height?: string;
    /**
     * Status code based on HTTP Response codes
     */
    statusCode?: number;
    /**
     * Style of the image text
     */
    textStyle?: { [key: string]: any };
    /**
     * Width of the SVG Error Indicator
     */
    width?: string;
  }
  interface RailzFinancialRatios {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterFinancialRatio;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzIncomeStatements {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterIncomeStatementsType;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzLoading {
    /**
     * Fill color of the loading indicator
     */
    fillColor?: string;
    /**
     * Height of the SVG Loading Indicator
     */
    height?: string;
    /**
     * Text to display at the bottom of the loading indicator
     */
    loadingText?: string;
    /**
     * Style of the text
     */
    textStyle?: { [key: string]: any };
    /**
     * Width of the SVG Loading Indicator
     */
    width?: string;
  }
  interface RailzPercentage {
    /**
     * Percentage to show
     */
    percentage?: number;
    percentageStyle?: RVOptionsPercentageStyle;
  }
  interface RailzProgressBar {
    /**
     * For whitelabeling styling
     */
    options?: RVOptionsBarStyle;
    /**
     * For overdue amount of an invoice or bill
     */
    overdueAmount?: number;
    /**
     * For paid amount of an invoice or bill
     */
    paidAmount?: number;
    /**
     * To indicate if its an invoice or bill
     */
    reportType?: RVReportTypes.INVOICES | RVReportTypes.BILLS;
    /**
     * For unpaid amount of an invoice or bill
     */
    unpaidAmount?: number;
  }
  interface RailzSelect {
    /**
     * The items to be listed
     */
    items?: string[];
    onSelectedItem?: (event: CustomEvent<number>) => void;
    /**
     * Position of the Select text when opened
     */
    selectStyle?: RVSelectStyle;
  }
  interface RailzSparklineChart {
    /**
     * Data to display for sparkline
     */
    data: Array<RVPeriodData>;
    sparkLineStyle?: RVOptionsRatioSparkLineStyle;
  }
  interface RailzStatementsChart {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterStatements;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzTooltip {
    /**
     * Question mark with a tooltip text
     */
    text?: string;
    /**
     * Position of the Tooltip text when hovered
     */
    tooltipStyle?: RVTooltipIndicatorStyle;
    tooltipText: string;
  }
  interface RailzTransactionsControl {
    /**
     * Configuration information like authentication configuration
     */
    configuration: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter: RVFilterTransactions;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface RailzVisualizations {
    /**
     * Configuration information like authentication configuration
     */
    configuration?: RVConfiguration;
    /**
     * Filter information to query the backend APIs
     */
    filter?: RVFilterAllReportTypes;
    /**
     * For whitelabeling styling
     */
    options?: RVOptions;
  }
  interface IntrinsicElements {
    'railz-bank-accounts': RailzBankAccounts;
    'railz-credit-score': RailzCreditScore;
    'railz-error-image': RailzErrorImage;
    'railz-financial-ratios': RailzFinancialRatios;
    'railz-income-statements': RailzIncomeStatements;
    'railz-loading': RailzLoading;
    'railz-percentage': RailzPercentage;
    'railz-progress-bar': RailzProgressBar;
    'railz-select': RailzSelect;
    'railz-sparkline-chart': RailzSparklineChart;
    'railz-statements-chart': RailzStatementsChart;
    'railz-tooltip': RailzTooltip;
    'railz-transactions-control': RailzTransactionsControl;
    'railz-visualizations': RailzVisualizations;
  }
}
export { LocalJSX as JSX };
declare module '@stencil/core' {
  export namespace JSX {
    interface IntrinsicElements {
      'railz-bank-accounts': LocalJSX.RailzBankAccounts &
        JSXBase.HTMLAttributes<HTMLRailzBankAccountsElement>;
      'railz-credit-score': LocalJSX.RailzCreditScore &
        JSXBase.HTMLAttributes<HTMLRailzCreditScoreElement>;
      'railz-error-image': LocalJSX.RailzErrorImage &
        JSXBase.HTMLAttributes<HTMLRailzErrorImageElement>;
      'railz-financial-ratios': LocalJSX.RailzFinancialRatios &
        JSXBase.HTMLAttributes<HTMLRailzFinancialRatiosElement>;
      'railz-income-statements': LocalJSX.RailzIncomeStatements &
        JSXBase.HTMLAttributes<HTMLRailzIncomeStatementsElement>;
      'railz-loading': LocalJSX.RailzLoading & JSXBase.HTMLAttributes<HTMLRailzLoadingElement>;
      'railz-percentage': LocalJSX.RailzPercentage &
        JSXBase.HTMLAttributes<HTMLRailzPercentageElement>;
      'railz-progress-bar': LocalJSX.RailzProgressBar &
        JSXBase.HTMLAttributes<HTMLRailzProgressBarElement>;
      'railz-select': LocalJSX.RailzSelect & JSXBase.HTMLAttributes<HTMLRailzSelectElement>;
      'railz-sparkline-chart': LocalJSX.RailzSparklineChart &
        JSXBase.HTMLAttributes<HTMLRailzSparklineChartElement>;
      'railz-statements-chart': LocalJSX.RailzStatementsChart &
        JSXBase.HTMLAttributes<HTMLRailzStatementsChartElement>;
      'railz-tooltip': LocalJSX.RailzTooltip & JSXBase.HTMLAttributes<HTMLRailzTooltipElement>;
      'railz-transactions-control': LocalJSX.RailzTransactionsControl &
        JSXBase.HTMLAttributes<HTMLRailzTransactionsControlElement>;
      'railz-visualizations': LocalJSX.RailzVisualizations &
        JSXBase.HTMLAttributes<HTMLRailzVisualizationsElement>;
    }
  }
}
