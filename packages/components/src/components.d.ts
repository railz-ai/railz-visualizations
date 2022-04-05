/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RVConfiguration, RVFilter, RVFilterDate, RVFilterFrequency, RVNoFrequencyTypes, RVOptions, RVOptionsBarStyle } from "./types";
export namespace Components {
    interface RailzErrorImage {
        /**
          * Fill color of the svg image representing a status code
         */
        "fillColor"?: string;
        /**
          * Height of the SVG Error Indicator
         */
        "height"?: string;
        /**
          * Status code based on HTTP Response codes
         */
        "statusCode"?: number;
        /**
          * Text to display at the bottom of the svg image
         */
        "text"?: string;
        /**
          * Color of the image text
         */
        "textStyle"?: { [key: string]: any };
        /**
          * Width of the SVG Error Indicator
         */
        "width"?: string;
    }
    interface RailzFinancialRatios {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
    interface RailzGaugeChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
    interface RailzLoading {
        /**
          * Fill color of the loading indicator
         */
        "fillColor"?: string;
        /**
          * Height of the SVG Loading Indicator
         */
        "height"?: string;
        /**
          * Text to display at the bottom of the loading indicator
         */
        "loadingText"?: string;
        /**
          * Style of the text
         */
        "textStyle"?: { [key: string]: any };
        /**
          * Width of the SVG Loading Indicator
         */
        "width"?: string;
    }
    interface RailzPieChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
    interface RailzProgressBar {
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptionsBarStyle;
        /**
          * For overdue amount of an invoice or bill
         */
        "overdueAmount": number;
        /**
          * For paid amount of an invoice or bill
         */
        "paidAmount": number;
        /**
          * To indicate if its an invoice or bill
         */
        "reportType"?: RVNoFrequencyTypes;
        /**
          * For unpaid amount of an invoice or bill
         */
        "unpaidAmount": number;
    }
    interface RailzStatementsChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterFrequency;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
    interface RailzTransactionsControl {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
    interface RailzVisualizations {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilter;
        /**
          * For whitelabeling styling
         */
        "options": RVOptions;
    }
}
declare global {
    interface HTMLRailzErrorImageElement extends Components.RailzErrorImage, HTMLStencilElement {
    }
    var HTMLRailzErrorImageElement: {
        prototype: HTMLRailzErrorImageElement;
        new (): HTMLRailzErrorImageElement;
    };
    interface HTMLRailzFinancialRatiosElement extends Components.RailzFinancialRatios, HTMLStencilElement {
    }
    var HTMLRailzFinancialRatiosElement: {
        prototype: HTMLRailzFinancialRatiosElement;
        new (): HTMLRailzFinancialRatiosElement;
    };
    interface HTMLRailzGaugeChartElement extends Components.RailzGaugeChart, HTMLStencilElement {
    }
    var HTMLRailzGaugeChartElement: {
        prototype: HTMLRailzGaugeChartElement;
        new (): HTMLRailzGaugeChartElement;
    };
    interface HTMLRailzLoadingElement extends Components.RailzLoading, HTMLStencilElement {
    }
    var HTMLRailzLoadingElement: {
        prototype: HTMLRailzLoadingElement;
        new (): HTMLRailzLoadingElement;
    };
    interface HTMLRailzPieChartElement extends Components.RailzPieChart, HTMLStencilElement {
    }
    var HTMLRailzPieChartElement: {
        prototype: HTMLRailzPieChartElement;
        new (): HTMLRailzPieChartElement;
    };
    interface HTMLRailzProgressBarElement extends Components.RailzProgressBar, HTMLStencilElement {
    }
    var HTMLRailzProgressBarElement: {
        prototype: HTMLRailzProgressBarElement;
        new (): HTMLRailzProgressBarElement;
    };
    interface HTMLRailzStatementsChartElement extends Components.RailzStatementsChart, HTMLStencilElement {
    }
    var HTMLRailzStatementsChartElement: {
        prototype: HTMLRailzStatementsChartElement;
        new (): HTMLRailzStatementsChartElement;
    };
    interface HTMLRailzTransactionsControlElement extends Components.RailzTransactionsControl, HTMLStencilElement {
    }
    var HTMLRailzTransactionsControlElement: {
        prototype: HTMLRailzTransactionsControlElement;
        new (): HTMLRailzTransactionsControlElement;
    };
    interface HTMLRailzVisualizationsElement extends Components.RailzVisualizations, HTMLStencilElement {
    }
    var HTMLRailzVisualizationsElement: {
        prototype: HTMLRailzVisualizationsElement;
        new (): HTMLRailzVisualizationsElement;
    };
    interface HTMLElementTagNameMap {
        "railz-error-image": HTMLRailzErrorImageElement;
        "railz-financial-ratios": HTMLRailzFinancialRatiosElement;
        "railz-gauge-chart": HTMLRailzGaugeChartElement;
        "railz-loading": HTMLRailzLoadingElement;
        "railz-pie-chart": HTMLRailzPieChartElement;
        "railz-progress-bar": HTMLRailzProgressBarElement;
        "railz-statements-chart": HTMLRailzStatementsChartElement;
        "railz-transactions-control": HTMLRailzTransactionsControlElement;
        "railz-visualizations": HTMLRailzVisualizationsElement;
    }
}
declare namespace LocalJSX {
    interface RailzErrorImage {
        /**
          * Fill color of the svg image representing a status code
         */
        "fillColor"?: string;
        /**
          * Height of the SVG Error Indicator
         */
        "height"?: string;
        /**
          * Status code based on HTTP Response codes
         */
        "statusCode"?: number;
        /**
          * Text to display at the bottom of the svg image
         */
        "text"?: string;
        /**
          * Color of the image text
         */
        "textStyle"?: { [key: string]: any };
        /**
          * Width of the SVG Error Indicator
         */
        "width"?: string;
    }
    interface RailzFinancialRatios {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface RailzGaugeChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface RailzLoading {
        /**
          * Fill color of the loading indicator
         */
        "fillColor"?: string;
        /**
          * Height of the SVG Loading Indicator
         */
        "height"?: string;
        /**
          * Text to display at the bottom of the loading indicator
         */
        "loadingText"?: string;
        /**
          * Style of the text
         */
        "textStyle"?: { [key: string]: any };
        /**
          * Width of the SVG Loading Indicator
         */
        "width"?: string;
    }
    interface RailzPieChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface RailzProgressBar {
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptionsBarStyle;
        /**
          * For overdue amount of an invoice or bill
         */
        "overdueAmount"?: number;
        /**
          * For paid amount of an invoice or bill
         */
        "paidAmount"?: number;
        /**
          * To indicate if its an invoice or bill
         */
        "reportType"?: RVNoFrequencyTypes;
        /**
          * For unpaid amount of an invoice or bill
         */
        "unpaidAmount"?: number;
    }
    interface RailzStatementsChart {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterFrequency;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface RailzTransactionsControl {
        /**
          * Configuration information like authentication configuration
         */
        "configuration": RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter": RVFilterDate;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface RailzVisualizations {
        /**
          * Configuration information like authentication configuration
         */
        "configuration"?: RVConfiguration;
        /**
          * Filter information to query the backend APIs
         */
        "filter"?: RVFilter;
        /**
          * For whitelabeling styling
         */
        "options"?: RVOptions;
    }
    interface IntrinsicElements {
        "railz-error-image": RailzErrorImage;
        "railz-financial-ratios": RailzFinancialRatios;
        "railz-gauge-chart": RailzGaugeChart;
        "railz-loading": RailzLoading;
        "railz-pie-chart": RailzPieChart;
        "railz-progress-bar": RailzProgressBar;
        "railz-statements-chart": RailzStatementsChart;
        "railz-transactions-control": RailzTransactionsControl;
        "railz-visualizations": RailzVisualizations;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "railz-error-image": LocalJSX.RailzErrorImage & JSXBase.HTMLAttributes<HTMLRailzErrorImageElement>;
            "railz-financial-ratios": LocalJSX.RailzFinancialRatios & JSXBase.HTMLAttributes<HTMLRailzFinancialRatiosElement>;
            "railz-gauge-chart": LocalJSX.RailzGaugeChart & JSXBase.HTMLAttributes<HTMLRailzGaugeChartElement>;
            "railz-loading": LocalJSX.RailzLoading & JSXBase.HTMLAttributes<HTMLRailzLoadingElement>;
            "railz-pie-chart": LocalJSX.RailzPieChart & JSXBase.HTMLAttributes<HTMLRailzPieChartElement>;
            "railz-progress-bar": LocalJSX.RailzProgressBar & JSXBase.HTMLAttributes<HTMLRailzProgressBarElement>;
            "railz-statements-chart": LocalJSX.RailzStatementsChart & JSXBase.HTMLAttributes<HTMLRailzStatementsChartElement>;
            "railz-transactions-control": LocalJSX.RailzTransactionsControl & JSXBase.HTMLAttributes<HTMLRailzTransactionsControlElement>;
            "railz-visualizations": LocalJSX.RailzVisualizations & JSXBase.HTMLAttributes<HTMLRailzVisualizationsElement>;
        }
    }
}
