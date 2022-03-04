import {NgModule} from '@angular/core';
import {VisualizationsComponent} from "./visualizations.component";
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/dist";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [VisualizationsComponent],
  imports: [BrowserModule, RailzVisualizationsModule],
  exports: [
    VisualizationsComponent
  ]
})
export class VisualizationsModule {
}
