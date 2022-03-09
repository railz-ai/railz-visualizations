import { NgModule } from "@angular/core";

import { defineCustomElements } from "@railzai/railz-visualizations/dist/loader";
import { DIRECTIVES } from "./stencil-generated";

defineCustomElements(window);
@NgModule({
  declarations: DIRECTIVES,
  imports: [],
  exports: DIRECTIVES,
})
export class RailzVisualizationsModule {}
