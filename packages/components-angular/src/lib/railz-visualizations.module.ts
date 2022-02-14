import { NgModule } from '@angular/core';

import { defineCustomElements } from '@railzai/railz-visualizations/loader';
import * as Components from './stencil-generated/components';

const RVComponents = [
  Components.RailzVisualizations,
  Components.RailzStatementsChart,
  Components.RailzTransactionsControl,
  Components.RailzErrorImage,
  Components.RailzLoading,
  Components.RailzProgressBar
];

defineCustomElements();
const DECLARATIONS = [
  // proxies
  ...RVComponents,
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
  ],
  exports: DECLARATIONS
})
export class RailzVisualizationsModule { }
