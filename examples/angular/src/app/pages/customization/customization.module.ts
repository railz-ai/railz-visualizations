import {NgModule} from '@angular/core';
import {CustomizationComponent} from "./customization.component";
import {VisualizationsModule} from "../../components/visualizations/visualizations.module";
import {FormModule} from "../../components/form/form.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [CustomizationComponent],
  imports: [
    BrowserModule,
    VisualizationsModule,
    FormModule
  ],
  exports: [
    CustomizationComponent
  ]
})
export class CustomizationModule {
}
