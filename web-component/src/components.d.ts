/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RailzChartsConfiguration, RailzChartsFilter, RailzChartsOptions } from "./components/railz-chart/types";
export namespace Components {
    interface RailzChart {
        "configuration": RailzChartsConfiguration | string;
        "debug": boolean;
        "filter": RailzChartsFilter | string;
        "loading": boolean;
        "options": RailzChartsOptions | string;
        "type": 'balanceSheets' | 'cashFlow';
    }
}
declare global {
    interface HTMLRailzChartElement extends Components.RailzChart, HTMLStencilElement {
    }
    var HTMLRailzChartElement: {
        prototype: HTMLRailzChartElement;
        new (): HTMLRailzChartElement;
    };
    interface HTMLElementTagNameMap {
        "railz-chart": HTMLRailzChartElement;
    }
}
declare namespace LocalJSX {
    interface RailzChart {
        "configuration": RailzChartsConfiguration | string;
        "debug"?: boolean;
        "filter"?: RailzChartsFilter | string;
        "loading"?: boolean;
        "options"?: RailzChartsOptions | string;
        "type"?: 'balanceSheets' | 'cashFlow';
    }
    interface IntrinsicElements {
        "railz-chart": RailzChart;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "railz-chart": LocalJSX.RailzChart & JSXBase.HTMLAttributes<HTMLRailzChartElement>;
        }
    }
}
