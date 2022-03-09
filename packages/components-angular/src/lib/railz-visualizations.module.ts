import { NgModule } from "@angular/core";

import { defineCustomElements } from "@railzai/railz-visualizations/dist/loader";
import * as Components from "./stencil-generated/components";

const RVComponents = [
  Components.RailzVisualizations,
  Components.RailzStatementsChart,
  Components.RailzTransactionsControl,
  Components.RailzErrorImage,
  Components.RailzLoading,
  Components.RailzProgressBar,
];

defineCustomElements(window);
const DECLARATIONS = [
  // proxies
  ...RVComponents,
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [],
  exports: DECLARATIONS,
})
export class RailzVisualizationsModule {}
