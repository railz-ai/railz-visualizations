import {NgModule} from '@angular/core';
import {VisualizationsComponent} from "./visualizations.component";
import {BrowserModule} from "@angular/platform-browser";
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular";

@NgModule({
  declarations: [VisualizationsComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  exports: [
    VisualizationsComponent
  ]
})
export class VisualizationsModule {
}
