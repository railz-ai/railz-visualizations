import {NgModule} from '@angular/core';
import {BasicComponent} from "./basic.component";
import {VisualizationsModule} from "../../components/visualizations/visualizations.module";
import {FormModule} from "../../components/form/form.module";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [BasicComponent],
  imports: [
    BrowserModule,
    VisualizationsModule,
    FormModule
  ],
  exports: [
    BasicComponent
  ]
})
export class BasicModule {
}
