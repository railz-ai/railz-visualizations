/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RVConfiguration, RVFilter, RVFilterDate, RVFilterFrequency, RVOptions } from "./types";
export namespace Components {
    interface RailzChartContainer {
        "options": any;
    }
    interface RailzErrorImage {
        "statusCode": number;
    }
    interface RailzLoading {
        "loadingText": string;
    }
    interface RailzProgressBar {
        "overdueAmount": number;
        "paidAmount": number;
        "reportType": string;
        "unpaidAmount": number;
    }
    interface RailzStatementsChart {
        "configuration": RVConfiguration;
        "filter": RVFilterFrequency;
        "options": RVOptions;
    }
    interface RailzTransactionsControl {
        "configuration": RVConfiguration;
        "filter": RVFilterDate;
        "options": RVOptions;
    }
    interface RailzVisualizations {
        "configuration": RVConfiguration;
        "filter": RVFilter;
        "options": RVOptions;
    }
}
declare global {
    interface HTMLRailzChartContainerElement extends Components.RailzChartContainer, HTMLStencilElement {
    }
    var HTMLRailzChartContainerElement: {
        prototype: HTMLRailzChartContainerElement;
        new (): HTMLRailzChartContainerElement;
    };
    interface HTMLRailzErrorImageElement extends Components.RailzErrorImage, HTMLStencilElement {
    }
    var HTMLRailzErrorImageElement: {
        prototype: HTMLRailzErrorImageElement;
        new (): HTMLRailzErrorImageElement;
    };
    interface HTMLRailzLoadingElement extends Components.RailzLoading, HTMLStencilElement {
    }
    var HTMLRailzLoadingElement: {
        prototype: HTMLRailzLoadingElement;
        new (): HTMLRailzLoadingElement;
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
        "railz-chart-container": HTMLRailzChartContainerElement;
        "railz-error-image": HTMLRailzErrorImageElement;
        "railz-loading": HTMLRailzLoadingElement;
        "railz-progress-bar": HTMLRailzProgressBarElement;
        "railz-statements-chart": HTMLRailzStatementsChartElement;
        "railz-transactions-control": HTMLRailzTransactionsControlElement;
        "railz-visualizations": HTMLRailzVisualizationsElement;
    }
}
declare namespace LocalJSX {
    interface RailzChartContainer {
        "options"?: any;
    }
    interface RailzErrorImage {
        "statusCode": number;
    }
    interface RailzLoading {
        "loadingText"?: string;
    }
    interface RailzProgressBar {
        "overdueAmount"?: number;
        "paidAmount"?: number;
        "reportType"?: string;
        "unpaidAmount"?: number;
    }
    interface RailzStatementsChart {
        "configuration": RVConfiguration;
        "filter": RVFilterFrequency;
        "options"?: RVOptions;
    }
    interface RailzTransactionsControl {
        "configuration": RVConfiguration;
        "filter": RVFilterDate;
        "options"?: RVOptions;
    }
    interface RailzVisualizations {
        "configuration": RVConfiguration;
        "filter": RVFilter;
        "options"?: RVOptions;
    }
    interface IntrinsicElements {
        "railz-chart-container": RailzChartContainer;
        "railz-error-image": RailzErrorImage;
        "railz-loading": RailzLoading;
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
            "railz-chart-container": LocalJSX.RailzChartContainer & JSXBase.HTMLAttributes<HTMLRailzChartContainerElement>;
            "railz-error-image": LocalJSX.RailzErrorImage & JSXBase.HTMLAttributes<HTMLRailzErrorImageElement>;
            "railz-loading": LocalJSX.RailzLoading & JSXBase.HTMLAttributes<HTMLRailzLoadingElement>;
            "railz-progress-bar": LocalJSX.RailzProgressBar & JSXBase.HTMLAttributes<HTMLRailzProgressBarElement>;
            "railz-statements-chart": LocalJSX.RailzStatementsChart & JSXBase.HTMLAttributes<HTMLRailzStatementsChartElement>;
            "railz-transactions-control": LocalJSX.RailzTransactionsControl & JSXBase.HTMLAttributes<HTMLRailzTransactionsControlElement>;
            "railz-visualizations": LocalJSX.RailzVisualizations & JSXBase.HTMLAttributes<HTMLRailzVisualizationsElement>;
        }
    }
}
