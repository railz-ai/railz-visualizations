import {NgModule} from '@angular/core';
import {OthersComponent} from "./others.component";
import {RailzVisualizationsModule} from "@railzai/railz-visualizations-angular/dist";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [OthersComponent],
  imports: [
    BrowserModule, RailzVisualizationsModule
  ],
  exports: [
    OthersComponent
  ]
})
export class OthersModule {
}
